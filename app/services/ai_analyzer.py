from openai import OpenAI
import json
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def analyze_risk(docs, question):
    prompt = f"""
    You are a legal contract risk analyzer. 
    Analyze the provided contract clauses and answer the question.
    
    Return the output in the following JSON format:
    {{
        "summary": "Brief summary of the analysis",
        "risks": [
            {{
                "clause": "The risky clause text",
                "risk": "Explanation of the risk",
                "severity": "High/Medium/Low"
            }}
        ],
        "suggestions": ["List of negotiation or modification suggestions"]
    }}

    Contract Clauses:
    {docs}

    Question:{question}
    """

    res = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"},
    )
    return json.loads(res.choices[0].message.content)
