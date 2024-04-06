import React from "react";
import "./App.css"
import MapComponent from './components/RealtimeMap';
import Banner from "./components/Banner";
import RouteSearchDiv from "./components/RouteSearchDiv";

function App() {

  return (
    <div className="App">
      <Banner />
      <MapComponent />
      <RouteSearchDiv />
    </div>
  );
}

export default App;
