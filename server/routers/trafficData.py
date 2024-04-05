from fastapi import APIRouter
from models import trafficDataItem
from typing import Dict

from database import trafficDataDict

router = APIRouter()

@router.post("/trafficData/", response_model=Dict[str, trafficDataItem.TrafficDataItem])
async def read_trafficData(request: trafficDataItem.TrafficDataRequest):
    return trafficDataDict