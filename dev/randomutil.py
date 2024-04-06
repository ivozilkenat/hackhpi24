import requests
import random
import time
import numpy as np

BASEURL = f"https://hackhpi24.ivo-zilkenat.de/api/"
# BASEURL = f"http://localhost:3001/api/"

capacities = {"suburban": 600,
"subway": 600,
"tram": 150,
"bus": 80,
"ferry": 150,
"express": 1000,
"regional":400,
"station":50}

def get_traffic_data():
    url = BASEURL + "trips/"
    data = {"bounds": {"upper-left": {"lat": 40.7128,"lon": -74.006}, "lower-right": {"lat": 40.7128,"lon": -74.006}}}
    response = requests.post(url, json=data)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to get data, status code: {response.status_code}")

def get_station_data():
    url = BASEURL + "stations/"
    data = {"bounds": {"upper-left": {"lat": 40.7128,"lon": -74.006}, "lower-right": {"lat": 40.7128,"lon": -74.006}}}
    response = requests.post(url, json=data)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to get data, status code: {response.status_code}")

# Function to update utilization for a given tripID
def update_vehicle_utilization(tripID, dataset):
    url = BASEURL + f"trips/{tripID}/updateUtilization"
    capacity = capacities.get(dataset[tripID]["subType"], 0)
    current_load = dataset[tripID]["utilization"]["rel"]

    if current_load != None:
        new_load = max(0, min(1, np.random.normal(0.5 + current_load / 2, 0.25)))
    else:
        new_load = random.random()
    new_load = round(new_load, 2)
    response = requests.post(url, json={"abs": int(new_load * capacity),"rel": new_load})
    if response.status_code == 200:
        print(f"Vehicle utilization updated for tripID {tripID}")
    else:
        print(f"Failed to update vehicle utilization for tripID {tripID}, status code: {response.status_code}")

def update_station_utilization(stationID, dataset):
    url = BASEURL + f"stations/{stationID}/updateUtilization"
    capacity = capacities["station"]
    current_load = dataset[stationID]["utilization"]["rel"]

    if current_load != None:
        new_load = max(0, min(1, np.random.normal(0.5 + current_load / 2, 0.25)))
    else:
        new_load = random.random()
    new_load = round(new_load, 2)
    response = requests.post(url, json={"abs": int(new_load * capacity),"rel": new_load})
    if response.status_code == 200:
        print(f"Station utilization updated for stationID {stationID}")
    else:
        print(f"Failed to update station utilization for stationID {stationID}, status code: {response.status_code}")

# List of tripIDs to update
  # Example tripIDs, replace with your actual tripIDs

# Main loop to update utilization every 5 seconds
while True:
    data = get_traffic_data()
    for tripID in data.keys():
        update_vehicle_utilization(tripID, data)
    data = get_station_data()
    for stationID in data.keys():
        update_station_utilization(stationID, data)
    time.sleep(5)
