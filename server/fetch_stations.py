import httpx
from fastapi import HTTPException
from models import trafficDataItem, core, station
import asyncio
import database

async def fetch_station_data(latitude: float, longitude: float, results: int, distance: int):
    url = "https://v6.vbb.transport.rest/locations/nearby"
    params = {
            'latitude': latitude,
            'longitude': longitude,
            'results': results,
            'distance': distance
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)

    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail="Failed to fetch data from the external API")

async def fetch_station_data_periodically(period_time: int = 1800):
    while True:
        # print("Fetching radar data...")
        station_data = await fetch_station_data(
            latitude = 52.3905026974688,
            longitude = 13.082066256124243,
            results = 10000,
            distance = 50000000
        )

        newStationDataDict = dict()

        for item in station_data:
            stationId = item["id"]
                    
            # Map the external API response to your StationInfo model
            # This is a basic mapping, adjust according to the actual response structure and your model
            newStationDataDict[stationId] = station.StationDataItem(
                id=stationId,
                name=item["name"],
                position=core.Position(
                    lat=item["location"]["latitude"], 
                    lon=item["location"]["longitude"]
                ),
                products=station.Products(
                    suburban=item["products"]["suburban"],
                    subway=item["products"]["subway"],
                    tram=item["products"]["tram"],
                    bus=item["products"]["bus"],
                    ferry=item["products"]["ferry"],
                    express=item["products"]["express"],
                    regional=item["products"]["regional"]
                ),    
                utilization=core.Utilization(
                    abs=None, 
                    rel=None
                )
            )  # Update this based on the actual data and mapping logic
            
        if stationId in database.stationDataDict:
                newStationDataDict[stationId].utilization = database.stationDataDict[stationId].utilization
            
        database.stationDataDict = newStationDataDict
            
        await asyncio.sleep(period_time)  # Wait for n seconds
        
                