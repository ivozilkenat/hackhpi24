# /routers/users.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/api/users/")
async def read_users():
    return [{"username": "johndoe"}, {"username": "janedoe"}]
