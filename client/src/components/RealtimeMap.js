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

  return Object.values(data).map(item => {
    let icon;
    if (item.type === 'Tram') {
      icon = tramIcon;
    } else if (item.type === 'Train') {
      icon = trainIcon;
    } else {
      icon = busIcon;
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
