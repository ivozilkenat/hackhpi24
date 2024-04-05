import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-realtime';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

function RealtimeMap() {
  const map = useMap();

  useEffect(() => {
    L.realtime({
      url: 'https://wanderdrone.appspot.com/',
      crossOrigin: true,
      type: 'json'
    }, {
      interval: 3 * 1000
    }).addTo(map);
  }, [map]);

  return null;
}

function MapComponent() {
  return (
    <MapContainer center={[0, 0]} zoom={13}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <RealtimeMap />
    </MapContainer>
  );
}

export default MapComponent;
