from fastapi import APIRouter
from models import station, core
import database
from typing import Dict

router = APIRouter()

@router.post("/stations/{stationName}/getStationID", response_model=str)
async def getStationId(stationName: str):
    # Looks up the id of a station from the name stored in the DB
    for v in database.stationDataDict.values():
        if v.name == stationName: return v.id
    return {"No known station with that name."}

@router.post("/stations/", response_model=float)
async def getAverageUtilization(request: str):
    relevant_entries = [x.utilization.rel for x in database.trafficDataDict.values() if x.line == request and x.utilization.rel != None]
    if len(relevant_entries) > 0:
        return mean(relevant_entries)
    return 0