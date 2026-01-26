from openai import OpenAI
import json
import os
from dotenv import load_dotenv
from app.services.prompts import LEGAL_SYSTEM_PROMPT, LAWYER_CHAT_PROMPT, build_prompt

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def chat_with_lawyer(docs, query):
    prompt = f"""
    Context from Contract:
    {docs}
    
    User Question: {query}
    """

    res = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": LAWYER_CHAT_PROMPT},
            {"role": "user", "content": prompt},
        ],
    )
    return {"reply": res.choices[0].message.content}


def analyze_risk(docs, query):
    prompt = build_prompt(docs)

    res = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": LEGAL_SYSTEM_PROMPT},
            {"role": "user", "content": prompt},
        ],
        response_format={"type": "json_object"},
    )
    return json.loads(res.choices[0].message.content)
