from fastapi import APIRouter
from models import station, core
import database
from typing import Dict

router = APIRouter()

@router.post("/stations/", response_model=Dict[str, station.StationDataItem])
async def get_stations(request: core.BoundDataRequest):
    return database.stationDataDict