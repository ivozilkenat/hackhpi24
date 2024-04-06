import React from "react";
import "./App.css"
import MapComponent from './components/RealtimeMap';
import HeaderBanner from "./components/HeaderBanner";

function App() {

  return (
    <div className="App">
      <HeaderBanner />
      <MapComponent />
    </div>
  );
}

export default App;
