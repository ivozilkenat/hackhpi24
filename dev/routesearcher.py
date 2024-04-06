import requests

def get_routeData(src, dst):
    #url = f"https://hackhpi24.ivo-zilkenat.de/api/trips/"
    #url = f"http://localhost:3001/api/trips/"
    #data = {"bounds": {"upper-left": {"lat": 40.7128,"lon": -74.006}, "lower-right": {"lat": 40.7128,"lon": -74.006}}}
    prequel = 'https://v6.vbb.transport.rest/journeys?'
    url = f'{prequel}from={src}&to={dst}&polylines=true&subStops=false&entrances=false&remarks=false&results=1'
    response = requests.get(url)
    if response.status_code == 200:
        return [x["geometry"]["coordinates"] for x in response.json()["journeys"][0]["legs"][1]["polyline"]["features"]]
    else:
        print(f"Failed to get data, status code: {response.status_code}")

coords = get_routeData(900230103, 900230088)
print(coords)