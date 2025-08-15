import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

# Load environment variables
load_dotenv()

# Initialize OpenRouter LLM
llm = ChatOpenAI(
    model="deepseek/deepseek-r1",  # ✅ OpenRouter model ID
    openai_api_key=os.getenv("OPENROUTER_API_KEY"),
    openai_api_base="https://openrouter.ai/api/v1"
)

prompt = ChatPromptTemplate.from_template("""
You are a legal expert AI. Analyze the following contract text and identify:
1. Key clauses
2. Potential risks for the tenant
3. Obligations for both parties

Contract text:
{text}
""")

chain = prompt | llm

def analyze_contract(contract_text: str) -> str:
    response = chain.invoke({"text": contract_text})
    return response.content
