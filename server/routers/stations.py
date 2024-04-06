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

@router.post("/stations/", response_model=Dict[str, station.StationDataItem])
async def get_stations(request: core.BoundDataRequest):
    return database.stationDataDict