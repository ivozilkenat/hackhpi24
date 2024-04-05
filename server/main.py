from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import items, users, trafficData

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(items.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(trafficData.router, prefix="/api")