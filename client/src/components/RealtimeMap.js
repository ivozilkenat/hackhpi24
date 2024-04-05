import React, { useState, useEffect } from "react";
import L from 'leaflet';
import './../../node_modules/leaflet/dist/leaflet.css'
import './css/RealtimeMap.css';
import 'leaflet-realtime';
import Bus from './Bus';
import Tram from './Tram';
import Train from './Train';
import { Marker } from 'react-leaflet';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

function RealtimeMap() {
  const map = useMap();
  const [data, setData] = useState([]);

  useEffect(() => {
    const bounds = map.getBounds();
    const upperLeft = bounds.getNorthWest();
    const lowerRight = bounds.getSouthEast();
    fetch('https://hackhpi24.ivo-zilkenat.de/api/trafficData/', {
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
  }, []);
  data["2"] = {"id": "2", "type": "bus", "position": {"lat": 52.3906, "lon": 13.0645}};

  return Object.values(data).map(item => (
    <Marker position={[item.position.lat, item.position.lon]}>
      {item.type === "bus" && <Bus data={item} />}
      {item.type === "tram" && <Tram data={item} />}
      {item.type === "train" && <Train data={item} />}
    </Marker>
  ));
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
