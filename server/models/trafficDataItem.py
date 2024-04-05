from pydantic import BaseModel, Field

# Model Definitions
class Position(BaseModel):
    lat: float = Field(..., example=40.7128)
    lon: float = Field(..., example=-74.0060)

class Utilization(BaseModel):
    abs: int | None = Field(..., example=50)
    rel: float | None = Field(..., example=0.75)

class TrafficDataItem(BaseModel):
    id: str = Field(..., example="1")
    type: str = Field(..., example="Bus")
    subType: str = Field(..., example="City Bus")
    position: Position
    line: str = Field(..., example="Line 1")
    direction: str = Field(..., example="North")
    utilization: Utilization
    
# Request Model
class Bounds(BaseModel):
    upper_left: Position = Field(..., alias="upper-left")
    lower_right: Position = Field(..., alias="lower-right")

class TrafficDataRequest(BaseModel):
    bounds: Bounds