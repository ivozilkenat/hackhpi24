from fastapi import APIRouter
from models import trafficDataItem, core
from typing import Dict

import database

router = APIRouter()

@router.post("/trips/", response_model=Dict[str, trafficDataItem.TrafficDataItem])
async def read_trafficData(request: core.BoundDataRequest):
    return database.trafficDataDict