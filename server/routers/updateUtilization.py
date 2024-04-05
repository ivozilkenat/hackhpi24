from fastapi import APIRouter
from models import trafficDataItem

import database

router = APIRouter()

@router.post("/{tripId}/updateUtilization")
async def update_bus_utilization(tripId: str, utilization: trafficDataItem.Utilization):
    # Here you can update the utilization data for the specific bus
    # For simplicity, this example just stores the data in the `buses_utilization` dictionary
    database.trafficDataDict[tripId].utilization = utilization
    return {"message": f"Updated utilization for bus {tripId}"}