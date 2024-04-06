import React, { useState, useEffect } from "react";
import L from 'leaflet';
import './../../node_modules/leaflet/dist/leaflet.css'
import './css/RealtimeMap.css';
import 'leaflet-realtime';
import { Marker } from 'react-leaflet';
import { Popup } from 'react-leaflet';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import getIcon from './VehicleIcons';
import { fetchCurrentData } from './ApiCall';

function RealtimeMap() {
  const map = useMap();
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchCurrentData(map, 'trips') // use fetchCurrentData here
        .then(data => {
          setData(data);
        });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return Object.values(data).map(item => {
    let icon;
    let colorClass;
    if (item.utilization.rel < 0.3) {
      colorClass = 'green-icon';
    } else if (item.utilization.rel >= 0.3 && item.utilization.rel <= 0.7) {
      colorClass = 'yellow-icon';
    } else {
      colorClass = 'red-icon';
    }

    icon = getIcon(item.subtype);

    icon.options.className = colorClass;

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
