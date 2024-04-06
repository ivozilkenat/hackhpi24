import React, { useState, useEffect } from "react";
import L from 'leaflet';
import './../../node_modules/leaflet/dist/leaflet.css'
import './css/RealtimeMap.css';
import 'leaflet-realtime';
import { Marker, Circle } from 'react-leaflet';
import { Popup } from 'react-leaflet';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import getIcon from './VehicleIcons';
import { fetchCurrentData } from './ApiCall';

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
    fetchCurrentData(map, 'stations') // use fetchCurrentData with 'stations' route
      .then(data => {
        setStations(data);
      });
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

    icon = getIcon(item.subType);

    icon.options.className = `${colorClass} vehicle-icon`;

    return (
      <Circle center={[item.position.lat, item.position.lon]} radius={100}>
        <Marker position={[item.position.lat, item.position.lon]} icon={icon}>
          <Popup>
            <p>
              Type: {capitalizeFirstLetter(item.type)} <br/>
              Line: {item.line} | Direction: {item.direction} <br/>
              <br/>
              Absolute Utilization: {item.utilization.abs} <br/>
              Relative Utilization: {item.utilization.rel}
            </p>
          </Popup>
        </Marker>
      </Circle>
    );
  });
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
