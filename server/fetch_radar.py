import httpx
from fastapi import HTTPException
from models import trafficDataItem
import asyncio
from database import trafficDataDict

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

async def fetch_radar_data_periodically(period_time: int = 1):
    while True:
        await asyncio.sleep(period_time)  # Wait for n seconds
        # print("Fetching radar data...")
        radar_data = await fetch_radar_data(
            north=52.4288, 
            west=12.96249, 
            south=52.35401, 
            east=13.16608, 
            results=1024, 
            duration=period_time * 2, 
            frames=2, 
            polylines=True, 
            language="en"
        )

        global trafficDataDict 
        trafficDataDict = dict()
        for movement in radar_data["movements"]:
                    
            trafficDataDict[movement["tripId"]] = trafficDataItem.TrafficDataItem(
                id=movement["tripId"],
                type=movement["line"]["mode"],
                subType=movement["line"]["product"],
                position=trafficDataItem.Position(
                    lon=movement["location"]["longitude"],
                    lat=movement["location"]["latitude"]    
                ),
                line=movement["line"]["name"],
                direction=movement["direction"],
                utilization=trafficDataItem.Utilization(
                    abs=None, 
                    rel=None
                )
            )
        
                