from fastapi import APIRouter
from models import core

import database

router = APIRouter()

@router.post("/trips/{tripId}/updateUtilization")
async def update_trip_utilization(tripId: str, utilization: core.Utilization):
    # Here you can update the utilization data for the specific bus
    # For simplicity, this example just stores the data in the `buses_utilization` dictionary
    database.trafficDataDict[tripId].utilization = utilization
    return {"message": f"Updated utilization for bus {tripId}"}

@router.post("/stations/{StationId}/updateUtilization")
async def update_station_utilization(StationId: str, utilization: core.Utilization):
    # Here you can update the utilization data for the specific bus
    # For simplicity, this example just stores the data in the `buses_utilization` dictionary
    database.stationDataDict[StationId].utilization = utilization
    return {"message": f"Updated utilization for station {StationId}"}