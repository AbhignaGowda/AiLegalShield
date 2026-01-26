# AiLegalShield

AI-powered legal contract analyzer and risk assessor.

## Technologies Used
*   **Backend Framework**: FastAPI (Python)
*   **Database**: NeonDB (Box/PostgreSQL) with SQLAlchemy
*   **Authentication**: JWT (OAuth2 Password Bearer) with Passlib (Bcrypt)
*   **AI/LLM**: OpenAI GPT-4o-mini
*   **Vector Store**: FAISS (In-memory)
*   **PDF Processing**: pypdf

## Setup

1.  **Install Prerequisites**:
    *   Python 3.13+
    *   [uv](https://github.com/astral-sh/uv) (recommended) or pip

2.  **Install Dependencies**:
    ```bash
    # using uv (recommended)
    uv sync
    
    # OR using pip (from requirements.txt)
    pip install -r requirements.txt
    ```

3.  **Environment Variables**:
    Create a `.env` file in the root directory:
    ```env
    OPENAI_API_KEY=sk-...
    DATABASE_URL=postgresql://user:pass@host/dbname?sslmode=require
    SECRET_KEY=your_secure_random_key
    ```

## Running the Application

Start the development server:

```bash
uvicorn app.main:app --reload
```

## Usage

1.  **Register & Login**:
    *   `POST /auth/register`: Create an account.
    *   `POST /auth/login`: Get your Bearer Token.
    *   **Authorize**: Use the token in the Swagger UI "Authorize" button.

2.  **Upload a Contract**:
    *   `POST /upload`: Upload PDF. Returns highly structured AI legal analysis.

3.  **Chat with Lawyer Assistant**:
    *   `POST /chat`: conversational interface.
    *   Query: "Should I sign this?", "Explain the indemnity clause".

API Documentation is available at `http://127.0.0.1:8000/docs`.
