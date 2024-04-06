from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import trafficData, updateUtilization, stations, lineUtilization

from fetch_radar import fetch_radar_data_periodically
from fetch_stations import fetch_station_data_periodically
import asyncio

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(trafficData.router, prefix="/api")
app.include_router(updateUtilization.router, prefix="/api")
app.include_router(stations.router, prefix="/api")
app.include_router(lineUtilization.router, prefix="/api")

# app.include_router(radar.router, prefix="/api")

@app.on_event("startup")
async def app_startup():
    asyncio.create_task(
        fetch_radar_data_periodically()
    )
    asyncio.create_task(
        fetch_station_data_periodically()
    )