import React, { useState, useEffect } from "react";
import Axios from "axios";
import MapComponent from './components/RealtimeMap';
import Title from './components/Title';

function App() {

  return (
    <div className="App">
      <Title />
      <MapComponent />
    </div>
  );
}

export default App;
