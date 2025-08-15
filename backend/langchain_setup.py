import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

load_dotenv()

llm = ChatOpenAI(
    model="google/gemini-flash-1.5",  # ✅ OpenRouter name
    openai_api_key=os.getenv("OPENROUTER_API_KEY"),
    openai_api_base="https://openrouter.ai/api/v1"
)

prompt = ChatPromptTemplate.from_template(
    "Summarize the following text: {text}"
)

chain = prompt | llm

if __name__ == "__main__":
    result = chain.invoke({"text": "This is a test contract text."})
    print(result.content)
