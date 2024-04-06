import React, { useState, useEffect } from "react";
import L from 'leaflet';
import './../../node_modules/leaflet/dist/leaflet.css'
import './css/RealtimeMap.css';
import 'leaflet-realtime';
import { Marker, Circle } from 'react-leaflet';
import { Popup } from 'react-leaflet';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import VehicleIcons from './VehicleIcons';
import { fetchCurrentData } from './ApiCall';
import { getIcon, getColor } from './VehicleIcons';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function RealtimeMap() {
  const map = useMap();
  const [data, setData] = useState([]);
  const [stations, setStations] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchCurrentData(map, 'trips')
        .then(data => {
          setData(data);
        });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchCurrentData(map, 'stations')
      .then(data => {
        setStations(data);
      });
  }, []);
  
  const tripMarkers = Object.values(data).map(item => {
    let icon;
    let colorClass;
    if (item.utilization.rel < 0.3) {
      colorClass = 'green-icon';
    } else if (item.utilization.rel >= 0.3 && item.utilization.rel <= 0.7) {
      colorClass = 'yellow-icon';
    } else {
      colorClass = 'red-icon';
    }

    icon = getIcon(item.subType);

    icon.options.className = `${colorClass} vehicle-icon`;

    return (
      <Circle center={[item.position.lat, item.position.lon]} radius={100}>
        <Marker position={[item.position.lat, item.position.lon]} icon={icon}>
          <Popup>
            <h1>
              {capitalizeFirstLetter(item.type)}
              </h1>
            <h2>
              {item.line} | To: {item.direction}
              </h2>
            <p>
              Absolute Utilization: {item.utilization.abs} <br/>
              Relative Utilization: {item.utilization.rel}
            </p>
          </Popup>
        </Marker>
      </Circle>
    );
  });
  
  const stationMarkers = Object.values(stations).map(item => {
    let color = getColor(item.products);
    return (
    <Circle center={[item.position.lat, item.position.lon]} radius={100} color={color}>
      <Popup>
        <h1>{item.name}</h1>
        <h2>Transportation mode(s): {
          Object.entries(item.products)
            .filter(([key, value]) => value)
            .map(([key]) => key)
            .join(', ')
        }</h2>
        <p>
          Absolute Utilization: {item.utilization.abs} <br/>
          Relative Utilization: {item.utilization.rel}
        </p>
      </Popup>
    </Circle>
    );
  });

  return [...tripMarkers, ...stationMarkers];
}

function MapComponent() {
  return (
    <MapContainer center={[52.3906, 13.0645]} zoom={13} zoomControl={false} className="map">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <RealtimeMap />
    </MapContainer>
  );
}

export default MapComponent;
