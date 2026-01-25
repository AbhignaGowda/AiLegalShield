import faiss
import numpy as np

dimensions = 1536
index = faiss.IndexFlatL2(dimensions)
stored_chunks = []


def store_embeddings(chunks, vectors):
    global stored_chunks
    stored_chunks.extend(chunks)

    index.add(np.array(vectors).astype("float32"))


def search_similar(query_embedding, k=5):
    if not stored_chunks:
        return []

    D, I = index.search(np.array([query_embedding]).astype("float32"), k)
    return [stored_chunks[i] for i in I[0] if i != -1 and i < len(stored_chunks)]
