from pydantic import Field, BaseModel

# Model Definitions
class Position(BaseModel):
    lat: float = Field(..., example=40.7128)
    lon: float = Field(..., example=-74.0060)

class Utilization(BaseModel):
    abs: int | None = Field(..., example=50)
    rel: float | None = Field(..., example=0.75)
    
# Request Model
class Bounds(BaseModel):
    upper_left: Position = Field(..., alias="upper-left")
    lower_right: Position = Field(..., alias="lower-right")
    
class BoundDataRequest(BaseModel):
    bounds: Bounds