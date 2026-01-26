from fastapi import APIRouter, HTTPException
from app.services.auth import hashed_password, verify_password, create_token

router = APIRouter()

fake_users = {}


@router.post("/register")
def register(email: str, password: str):
    if email in fake_users:
        raise HTTPException(status_code=400, detail="User already exists")
    fake_users[email] = hashed_password(password)
    return {"message": "User registered successfully"}


@router.post("/login")
def login(email: str, password: str):
    if email not in fake_users or not verify_password(password, fake_users[email]):
        raise HTTPException(status_code=401, detail="Invaild credentials")
    token = create_token({"sub": email})
    return {"access_token": token}
