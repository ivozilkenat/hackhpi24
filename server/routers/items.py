# /routers/items.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/api/items/")
async def read_items():
    return [{"name": "Item Foo"}, {"name": "Item Bar"}]
