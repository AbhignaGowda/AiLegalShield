"""Authentication service with JWT token management."""
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import timedelta
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from app.core.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES, JWT_ISSUER, JWT_AUDIENCE
from app.core.security import generate_jti, get_utc_now

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    now = get_utc_now()
    expire = now + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    
    to_encode.update({
        "exp": expire,
        "iat": now,
        "iss": JWT_ISSUER,
        "aud": JWT_AUDIENCE,
        "jti": generate_jti()
    })
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_token(token: str) -> Optional[dict]:
    try:
        return jwt.decode(
            token, SECRET_KEY, algorithms=[ALGORITHM],
            audience=JWT_AUDIENCE, issuer=JWT_ISSUER,
            options={"require_exp": True, "require_iat": True, "require_sub": True}
        )
    except JWTError:
        return None


def get_current_user(token: str = Depends(oauth2_scheme)) -> str:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    payload = verify_token(token)
    if payload is None:
        raise credentials_exception
    
    email = payload.get("sub")
    if email is None:
        raise credentials_exception
    return email


def authenticate_user(db, email: str, password: str):
    from app.models.user import User
    
    user = db.query(User).filter(User.email == email).first()
    
    # Constant-time comparison to prevent timing attacks
    if user is None:
        dummy_hash = "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VHmEP6cH1L.wHy"
        pwd_context.verify(password, dummy_hash)
        return None
    
    if not verify_password(password, user.hashed_password):
        return None
    return user
