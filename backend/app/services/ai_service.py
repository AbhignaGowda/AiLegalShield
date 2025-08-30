import json
import openai
from typing import Dict, Any, List
from fastapi import HTTPException

from app.config import settings
from app.models.schemas import ChatMessage

class AIService:
    def __init__(self):
        self.client = openai.OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=settings.OPENROUTER_API_KEY,
        )

    async def analyze_contract(self, contract_text: str, contract_type: str) -> Dict[str, Any]:
        """Analyze contract and return structured results"""
        prompt = self._build_analysis_prompt(contract_text, contract_type)
        
        try:
            response = self.client.chat.completions.create(
                model=settings.AI_MODEL,
                messages=[
                    {"role": "system", "content": "You are a legal expert who provides clear contract analysis in JSON format."},
                    {"role": "user", "content": prompt}
                ],
                temperature=settings.AI_TEMPERATURE,
                max_tokens=settings.AI_MAX_TOKENS
            )
            
            content = response.choices[0].message.content
            return self._parse_json_response(content)
            
        except json.JSONDecodeError as e:
            raise HTTPException(status_code=500, detail=f"AI response parsing error: {str(e)}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"AI analysis error: {str(e)}")

    async def chat_about_contract(
        self,
        message: str,
        contract_text: str,
        analysis_result: Dict[str, Any],
        chat_history: List[ChatMessage]
    ) -> str:
        """Handle chat questions about the contract"""
        context_messages = self._build_chat_context(
            contract_text, analysis_result, chat_history, message
        )
        
        try:
            response = self.client.chat.completions.create(
                model=settings.AI_MODEL,
                messages=context_messages,
                temperature=settings.CHAT_TEMPERATURE,
                max_tokens=settings.CHAT_MAX_TOKENS
            )
            
            return response.choices[0].message.content
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")

    def _build_analysis_prompt(self, contract_text: str, contract_type: str) -> str:
        """Build structured analysis prompt"""
        return f"""
You are an expert contract lawyer. Analyze this {contract_type} contract and identify risky clauses.

CONTRACT TEXT:
{contract_text}

Return your analysis in this exact JSON format:
{{
    "overall_risk_score": <1-10 integer>,
    "risky_clauses": [
        {{
            "clause_text": "<exact text from contract>",
            "risk_level": "<high|medium|low>",
            "explanation": "<why this is risky in plain English>",
            "suggestion": "<how to negotiate or what to ask for>"
        }}
    ],
    "summary": "<2-3 sentence overall assessment>",
    "negotiation_points": ["<key points to negotiate>"]
}}

Focus on common red flags like:
- Excessive penalties or fees
- One-sided termination clauses  
- Broad liability or indemnification
- Automatic renewals
- Restrictive non-compete clauses
- Unusual payment terms
"""

    def _build_chat_context(
        self,
        contract_text: str,
        analysis_result: Dict[str, Any],
        chat_history: List[ChatMessage],
        current_message: str
    ) -> List[Dict[str, str]]:
        """Build chat context messages"""
        context_messages = [
            {
                "role": "system",
                "content": f"""You are an expert legal advisor chatbot. You can ONLY answer questions about the specific contract that was analyzed.

CONTRACT ANALYSIS CONTEXT:
- Contract Type: {analysis_result.get('contract_type', 'general')}
- Overall Risk Score: {analysis_result.get('overall_risk_score', 'N/A')}/10
- Summary: {analysis_result.get('summary', '')}
- Risky Clauses Found: {len(analysis_result.get('risky_clauses', []))}
- Negotiation Points: {len(analysis_result.get('negotiation_points', []))}

CONTRACT TEXT:
{contract_text[:3000]}...

PREVIOUS ANALYSIS RESULTS:
{json.dumps(analysis_result, indent=2)}

IMPORTANT RULES:
1. ONLY answer questions related to this specific contract and its analysis
2. If asked about other contracts, legal advice in general, or unrelated topics, politely redirect to the current contract
3. Base your answers on the contract text and analysis results provided
4. Be helpful but remind users to consult a real lawyer for legal decisions
5. Keep responses concise and practical
6. If you need to reference specific clauses, quote them directly from the contract"""
            }
        ]

        # Add chat history (last 10 messages)
        for msg in chat_history[-10:]:
            context_messages.append({
                "role": msg.role,
                "content": msg.content
            })

        # Add current message
        context_messages.append({
            "role": "user",
            "content": current_message
        })

        return context_messages

    def _parse_json_response(self, content: str) -> Dict[str, Any]:
        """Parse JSON from AI response"""
        # Clean up response (AI sometimes adds markdown formatting)
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0]
        elif "```" in content:
            content = content.split("```")[1].split("```")[0]
        
        return json.loads(content.strip())