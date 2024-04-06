import React, { useState, useEffect } from "react";
import L from 'leaflet';
import './../../node_modules/leaflet/dist/leaflet.css'
import './css/RealtimeMap.css';
import './css/Vehicle.css';
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
    console.log(item.utilization.rel);
    let icon;
    let colorClass;
    if (item.utilization.rel == null) {
      colorClass = 'gray-icon';
    } else if (item.utilization.rel < 0.3) {
      colorClass = 'green-icon';
    } else if (item.utilization.rel >= 0.3 && item.utilization.rel <= 0.7) {
      colorClass = 'yellow-icon';
    } else {
      colorClass = 'red-icon';
    }

    icon = getIcon(item.subType);

    icon.options.className = `${colorClass} vehicle-icon`;

    return (
      <Marker position={[item.position.lat, item.position.lon]} icon={icon}>
        <Popup>
        <div className="popup-content">
          <div className="popup-heading">
            Type: {capitalizeFirstLetter(item.subType)} | Line: {item.line}
          </div>
          <div className="popup-info">
            <div className="info-line">
              <span className="info-label">Direction:</span> {item.direction}
            </div>
            <div className="info-line">
              <span className="info-label">Absolute Utilization:</span> {item.utilization.abs !== null ? item.utilization.abs : "null"}
            </div>
            <div className="info-line">
              <span className="info-label">Relative Utilization:</span> {item.utilization.rel !== null ? item.utilization.rel : "null"}
            </div>
          </div>
        </div>
        </Popup>
      </Marker>
    );
  });
  
  const stationMarkers = Object.values(stations).map(item => {
    let color = getColor(item.products);
    return (
    <Circle center={[item.position.lat, item.position.lon]} radius={25} color={color}>
      <Popup>
      <div className="popup-content">
        <div className="popup-heading">
          {item.name}
        </div>
        <div className="popup-info">
          <div className="info-line">
            <span><span className="info-label">Transportation mode(s):</span> { 
              Object.entries(item.products)
                .filter(([key, value]) => value)
                .map(([key]) => key)
                .join(', ')
            }</span>
          </div>
          <div className="info-line">
            <span className="info-label">Absolute Utilization:</span> {item.utilization.abs !== null ? item.utilization.abs : 'null'}
          </div>
          <div className="info-line">
            <span className="info-label">Relative Utilization:</span> {item.utilization.rel !== null ? item.utilization.rel : 'null'}
          </div>
        </div>
      </div>
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
