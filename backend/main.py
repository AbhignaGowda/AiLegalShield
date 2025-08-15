from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
        "http://localhost:3000",  # Your Next.js development server
        # Add your production Next.js domain here
 ]

app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
@app.get("/api/hello")
async def hello():
        return {"message": "Hello from FastAPI!"}