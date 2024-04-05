from fastapi import APIRouter
from models import trafficDataItem

from database import trafficDataDict

router = APIRouter()

@router.post("/{bus_id}/updateUtilization")
async def update_bus_utilization(bus_id: str, utilization: trafficDataItem.Utilization):
    # Here you can update the utilization data for the specific bus
    # For simplicity, this example just stores the data in the `buses_utilization` dictionary
    trafficDataDict[bus_id].utilization = utilization
    return {"message": f"Updated utilization for bus {bus_id}"}