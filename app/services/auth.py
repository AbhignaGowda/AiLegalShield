from passlib.context import CryptContext
from jose import jwt
from datetime import datetime
from app.core.config import SECRET_KEY, ALGORITHM
from datetime import timedelta

pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password):
    return pwd.hash(password)


def verify_password(password, hashed_password):
    return pwd.verify(password, hashed_password)


def create_token(data):
    payload = data.copy()
    payload["exp"] = datetime.utcnow() + timedelta(hours=1)
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
