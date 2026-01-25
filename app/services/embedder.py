from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def embed_chunks(chunks):
    embeddings = []
    for chunk in chunks:
        emb = client.embeddings.create(model="text-embedding-ada-002", input=chunk)
        embeddings.append(emb.data[0].embedding)
    return embeddings
