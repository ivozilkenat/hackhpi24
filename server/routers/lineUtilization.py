from fastapi import APIRouter
from models import trafficDataItem, core
from typing import Dict
from statistics import mean

import database

router = APIRouter()

@router.post("/lineUtilization/", response_model=float)
async def getAverageUtilization(request: str):
    return mean([x["utilization"]["rel"] for x in database.trafficDataDict.values() if x["line"] == request])