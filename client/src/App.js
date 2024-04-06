import React from "react";
import "./App.css"
import MapComponent from './components/RealtimeMap';
import Banner from "./components/Banner";
import InputBox from "./components/inputBox";

function App() {

  return (
    <div className="App">
      <Banner />
      <InputBox />
      <MapComponent />
    </div>
  );
}

export default App;
