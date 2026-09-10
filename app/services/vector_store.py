"""User-isolated vector store for document embeddings."""
import faiss
import numpy as np
from typing import Dict, List
import threading

DIMENSIONS = 384


class UserVectorStore:
    def __init__(self, user_id: str):
        self.user_id = user_id
        self.index = faiss.IndexFlatL2(DIMENSIONS)
        self.stored_chunks: List[str] = []
        self._lock = threading.Lock()
    
    def store_embeddings(self, chunks: List[str], vectors: List[List[float]]) -> None:
        with self._lock:
            self.stored_chunks.extend(chunks)
            self.index.add(np.array(vectors).astype("float32"))
    
    def search_similar(self, query_embedding: List[float], k: int = 5) -> List[str]:
        with self._lock:
            if not self.stored_chunks:
                return []
            
            query_array = np.array([query_embedding]).astype("float32")
            _, indices = self.index.search(query_array, min(k, len(self.stored_chunks)))
            
            return [self.stored_chunks[i] for i in indices[0] if i != -1 and i < len(self.stored_chunks)]
    
    def is_empty(self) -> bool:
        return len(self.stored_chunks) == 0
    
    def clear(self) -> None:
        with self._lock:
            self.index = faiss.IndexFlatL2(DIMENSIONS)
            self.stored_chunks = []


class VectorStoreManager:
    def __init__(self):
        self._stores: Dict[str, UserVectorStore] = {}
        self._lock = threading.Lock()
    
    def get_store(self, user_id: str) -> UserVectorStore:
        with self._lock:
            if user_id not in self._stores:
                self._stores[user_id] = UserVectorStore(user_id)
            return self._stores[user_id]
    
    def delete_store(self, user_id: str) -> bool:
        with self._lock:
            if user_id in self._stores:
                del self._stores[user_id]
                return True
            return False


_manager = VectorStoreManager()


def get_user_store(user_id: str) -> UserVectorStore:
    return _manager.get_store(user_id)


def delete_user_store(user_id: str) -> bool:
    return _manager.delete_store(user_id)
