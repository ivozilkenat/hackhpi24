from pydantic import Field, BaseModel
from models import core, station
import time

class Leg(BaseModel):
    src: station.StationDataItem
    dst: station.StationDataItem
    start: time.datetime
    stop: time.datetime
    line: str
    subtype: str
    polyline: core.Position = Field(...)

class Route(BaseModel):
    src: station.StationDataItem
    dst: station.StationDataItem
    legs: Leg = Field(...)
    averageUtilisation : float
    start: time.datetime
    end: time.datetime
