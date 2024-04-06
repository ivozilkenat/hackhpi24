import React from "react";
import "./App.css"
import MapComponent from './components/RealtimeMap';
import Banner from "./components/Banner";

function App() {

  return (
    <div className="App">
      <Banner />
      <MapComponent />
    </div>
  );
}

export default App;
