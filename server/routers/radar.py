# import httpx
# from fastapi import APIRouter, HTTPException

# router = APIRouter()

# async def fetch_radar_data(north: float, west: float, south: float, east: float, results: int = 256, duration: int = 30, frames: int = 3, polylines: bool = True, language: str = "en"):
#     url = "https://v6.vbb.transport.rest/radar"
#     params = {
#         "north": north,
#         "west": west,
#         "south": south,
#         "east": east,
#         "results": results,
#         "duration": duration,
#         "frames": frames,
#         "polylines": polylines,
#         "language": language
#     }

#     async with httpx.AsyncClient() as client:
#         response = await client.get(url, params=params)

#     if response.status_code == 200:
#         return response.json()
#     else:
#         raise HTTPException(status_code=response.status_code, detail="Failed to fetch radar data from VBB API")

# @router.get("/api/radar")
# async def api_vbb_radar(north: float, west: float, south: float, east: float, results: int = 256, duration: int = 30, frames: int = 3, polylines: bool = True, language: str = "en"):
#     return await fetch_radar_data(north, west, south, east, results, duration, frames, polylines, language)