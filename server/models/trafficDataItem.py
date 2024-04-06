from pydantic import BaseModel, Field
from models import core

class TrafficDataItem(BaseModel):
    id: str = Field(..., example="1")
    type: str = Field(..., example="Bus")
    subType: str = Field(..., example="City Bus")
    position: core.Position
    line: str = Field(..., example="Line 1")
    direction: str = Field(..., example="North")
    utilization: core.Utilization
