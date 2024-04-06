export function fetchCurrentData(map, route) {
  const bounds = map.getBounds();
  const upperLeft = bounds.getNorthWest();
  const lowerRight = bounds.getSouthEast();
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const port = hostname === "localhost" ? "3001" : "443";

  return fetch(`${protocol}//${hostname}:${port}/api/${route}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "bounds": {
        "upper-left": {
          "lat": upperLeft.lat,
          "lon": upperLeft.lng
        },
        "lower-right": {
          "lat": lowerRight.lat,
          "lon": lowerRight.lng
        }
      }
    })
  })
  .then(response => response.json());
}
