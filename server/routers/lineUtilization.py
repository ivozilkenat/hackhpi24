from fastapi import APIRouter
from statistics import mean

import database

router = APIRouter()

@router.post("/lineUtilization/", response_model=float)
async def getAverageUtilization(request: str):
    relevant_entries = [x.utilization.rel for x in database.trafficDataDict.values() if x.line == request and x.utilization.rel != None]
    if len(relevant_entries) > 0:
        return mean(relevant_entries)
    return 0