import React, { useState, useEffect } from "react";
import L from 'leaflet';
import './../../node_modules/leaflet/dist/leaflet.css'
import './css/RealtimeMap.css';
import 'leaflet-realtime';
import Vehicle from './Vehicle.js';
import { Marker } from 'react-leaflet';
import { Popup } from 'react-leaflet';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import busIconUrl from '../resources/bus_icon.png';
import trainIconUrl from '../resources/train_icon.png';
import tramIconUrl from '../resources/tram_icon.png';
import subwayIconUrl from '../resources/subway_icon.png';
import ferryIconUrl from '../resources/ferry_icon.png';
import expressIconUrl from '../resources/express_icon.png';
import suburbanIconUrl from '../resources/suburban_icon.png';

const busIcon = L.icon({
  iconUrl: busIconUrl,
  iconSize: [40, 40],
});

const trainIcon = L.icon({
  iconUrl: trainIconUrl,
  iconSize: [25, 41],
});

const tramIcon = L.icon({
  iconUrl: tramIconUrl,
  iconSize: [25, 41],
});

const subwayIcon = L.icon({
  iconUrl: subwayIconUrl,
  iconSize: [25, 41],
});

const ferryIcon = L.icon({
  iconUrl: ferryIconUrl,
  iconSize: [25, 41],
});

function RealtimeMap() {
  const map = useMap();
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const bounds = map.getBounds();
      const upperLeft = bounds.getNorthWest();
      const lowerRight = bounds.getSouthEast();
      const hostname = window.location.hostname;
      const protocol = window.location.protocol;
      const port = hostname === "localhost" ? "3001" : "443";
      fetch(`${protocol}//${hostname}:${port}/api/trafficData`, {
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
        .then(response => response.json())
        .then(data => {
          setData(data);
        });
    }, 1000);

  return () => clearInterval(interval);
}, []);

  return Object.values(data).map(item => {
    let icon;
    switch (item.subtype) {
      case "suburban":
        icon = suburbanIcon;
        break;
      case "subway":
        icon = subwayIcon;
        break;
      case "tram":
        icon = tramIcon;
        break;
      case "bus":
        icon = busIcon;
        break;
      case "ferry":
        icon = ferryIcon;
        break;
      case "express":
        icon = expressIcon;
        break;
      case "regional":
        icon = trainIcon;
        break;
      default:
        icon = busIcon;
        break;
    }

    return (
      <Marker position={[item.position.lat, item.position.lon]} icon={icon}>
        <Popup>
          <p>
            Absolute Utilization: {item.utilization.abs} <br/>
            Relative Utilization: {item.utilization.rel}
          </p>
        </Popup>
      </Marker>
    );
  });
}

function MapComponent() {
  return (
    <MapContainer center={[52.3906, 13.0645]} zoom={13} className="map">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <RealtimeMap />
    </MapContainer>
  );
}

export default MapComponent;
