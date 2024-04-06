import React from "react";
import "./App.css"
import Banner from "./components/Banner";
import InputBox from "./components/InputBox";
import RouteSearchDiv from "./components/RouteSearchDiv";
import RealtimeMap from "./components/RealtimeMap";

function App() {

  return (
    <div className="App">
      <Banner className="Banner"/>
      <RouteSearchDiv className="RouteSearchDiv"/>
      <RealtimeMap className="RealtimeMap"/>
    </div>
  );
}

export default App;
