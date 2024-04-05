from fastapi import APIRouter
from models import trafficDataItem
from typing import List

from database import trafficDataList

router = APIRouter()

@router.post("/trafficData/", response_model=List[trafficDataItem.TrafficDataItem])
async def read_trafficData(request: trafficDataItem.TrafficDataRequest):
    return trafficDataList