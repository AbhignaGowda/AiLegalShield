# AiLegalShield

AI-powered legal contract analyzer and risk assessor.

## Setup

1.  **Install Prerequisites**:
    *   Python 3.13+
    *   [uv](https://github.com/astral-sh/uv) (recommended) or pip

2.  **Install Dependencies**:
    ```bash
    # using uv (recommended)
    uv sync
    
    # OR using pip
    pip install fastapi uvicorn openai langchain faiss-cpu pypdf python-multipart
    ```

3.  **Environment Variables**:
    Create a `.env` file in the root directory:
    ```env
    OPENAI_API_KEY=your_api_key_here
    ```

## Running the Application

Start the development server:

```bash
uvicorn app.main:app --reload
```

## Usage

1.  **Upload a Contract**:
    *   Endpoint: `POST /upload`
    *   Body: Multipart form data with a PDF file.

2.  **Analyze Risk**:
    *   Endpoint: `POST /analyze`
    *   Query Parameter: `query` (e.g., "What are the termination conditions?")

API Documentation is available at `http://127.0.0.1:8000/docs`.
