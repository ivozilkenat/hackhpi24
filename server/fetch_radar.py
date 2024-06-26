import httpx
from fastapi import HTTPException
from models import trafficDataItem, core
import asyncio
import database

async def fetch_radar_data(north: float, west: float, south: float, east: float, results: int = 256, duration: int = 30, frames: int = 3, polylines: bool = True, language: str = "en"):
    url = "https://v6.vbb.transport.rest/radar"
    params = {
        "north": north,
        "west": west,
        "south": south,
        "east": east,
        "results": results,
        "duration": duration,
        "frames": frames,
        "polylines": polylines,
        "language": language
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)

    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail="Failed to fetch radar data from VBB API")

async def fetch_radar_data_periodically(period_time: int = 5):
    while True:
        # print("Fetching radar data...")
        radar_data = await fetch_radar_data(
            north=52.4288, 
            west=12.96249, 
            south=52.35401, 
            east=13.16608, 
            results=1024, 
            duration=0, 
            frames=0, 
            polylines=True, 
            language="en"
        )
 
        newTrafficDataDict = dict()
        
        for movement in radar_data["movements"]:
            tripId = movement["tripId"].replace("|", "")
            
            newTrafficDataDict[tripId] = trafficDataItem.TrafficDataItem(
                id=tripId,
                type=movement["line"]["mode"],
                subType=movement["line"]["product"],
                position=core.Position(
                    lon=movement["location"]["longitude"],
                    lat=movement["location"]["latitude"]    
                ),
                line=movement["line"]["name"],
                direction=movement["direction"],
                utilization=core.Utilization(
                    abs=None, 
                    rel=None
                )
            )
            
            if tripId in database.trafficDataDict:
                newTrafficDataDict[tripId].utilization = database.trafficDataDict[tripId].utilization
            
        database.trafficDataDict = newTrafficDataDict
        
        await asyncio.sleep(period_time)  # Wait for n seconds
        
                