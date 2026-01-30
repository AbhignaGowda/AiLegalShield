"""AI-powered contract analysis"""

from groq import Groq
import json
import os
import logging
from dotenv import load_dotenv

from app.services.prompts import LEGAL_SYSTEM_PROMPT, LAWYER_CHAT_PROMPT, build_prompt
from app.core.security import sanitize_user_input

load_dotenv()
logger = logging.getLogger(__name__)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))
MODEL_NAME = os.getenv("LLM_MODEL")


def chat_with_lawyer(docs: list, query: str) -> dict:
    safe_query = sanitize_user_input(query, max_length=1000)
    context_text = (
        "\n---\n".join(str(doc) for doc in docs)
        if docs
        else "No contract context available."
    )

    messages = [
        {"role": "system", "content": LAWYER_CHAT_PROMPT},
        {
            "role": "user",
            "content": f"CONTRACT CONTEXT:\n---\n{context_text}\n---\n\nQUESTION: {safe_query}",
        },
    ]

    try:
        res = client.chat.completions.create(
            model=MODEL_NAME,
            messages=messages,
            temperature=0.3,
            max_tokens=1000,
        )
        return {"reply": res.choices[0].message.content}
    except Exception as e:
        logger.error(f"Groq API error: {type(e).__name__}: {e}")
        raise


def analyze_risk(docs: str, query: str) -> dict:
    prompt = build_prompt(docs)
    messages = [
        {"role": "system", "content": LEGAL_SYSTEM_PROMPT},
        {"role": "user", "content": prompt},
    ]

    try:
        res = client.chat.completions.create(
            model=MODEL_NAME,
            messages=messages,
            response_format={"type": "json_object"},
            temperature=0.2,
            max_tokens=2000,
        )
        return json.loads(res.choices[0].message.content)
    except json.JSONDecodeError as e:
        logger.error(f"JSON parse error: {e}")
        return {
            "error": "Failed to parse analysis",
            "summary": "",
            "risks": [],
            "overall_score": 0,
        }
    except Exception as e:
        logger.error(f"Groq API error: {type(e).__name__}: {e}")
        raise
