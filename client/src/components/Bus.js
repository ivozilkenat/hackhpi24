import React, { useState, useEffect } from "react";
import './css/Vehicle.css';

function Bus({ data }) {
  return (
    <div>
      <h2>{data.type}</h2>
      <p>ID: {data.id}</p>
      <p>Latitude: {data.position.lat}</p>
      <p>Longitude: {data.position.lon}</p>
    </div>
  );
}

export default Bus;
