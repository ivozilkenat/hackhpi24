from pydantic import BaseModel
from models import core

class Products(BaseModel):
    suburban: bool
    subway: bool
    tram: bool
    bus: bool
    ferry: bool
    express: bool
    regional: bool

# Define Pydantic model for the station information
class StationDataItem(BaseModel):
    id: str
    name: str
    position: core.Position
    products: Products
    utilization: core.Utilization
