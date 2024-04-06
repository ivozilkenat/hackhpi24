import requests
import random
import time


def get_tripIDs():
    # url = f"https://hackhpi24.ivo-zilkenat.de/api/trips/"
    url = f"http://localhost:3001/api/trips/"
    data = {"bounds": {"upper-left": {"lat": 40.7128,"lon": -74.006}, "lower-right": {"lat": 40.7128,"lon": -74.006}}}
    response = requests.post(url, json=data)
    if response.status_code == 200:
        return response.json().keys()
    else:
        print(f"Failed to get data, status code: {response.status_code}")

# Function to update utilization for a given tripID
def update_utilization(tripID):
    url = f"https://hackhpi24.ivo-zilkenat.de/api/trips/{tripID}/updateUtilization"
    #url = f"http://localhost:3001/api/trips/{tripID}/updateUtilization"
    response = requests.post(url, json={"abs": random.randint(1, 200),"rel": random.random()})
    if response.status_code == 200:
        print(f"Utilization updated for tripID {tripID}")
    else:
        print(f"Failed to update utilization for tripID {tripID}, status code: {response.status_code}")

# List of tripIDs to update
  # Example tripIDs, replace with your actual tripIDs

# Main loop to update utilization every 5 seconds
while True:
    tripIDs = get_tripIDs()
    for tripID in tripIDs:
        update_utilization(tripID)
    time.sleep(5)
