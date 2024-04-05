import React, { useState, useEffect } from "react";
import Axios from "axios";
import MapComponent from './components/RealtimeMap';
import Title from './components/Title';

function App() {
  const [products, setProducts] = useState([]);

  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const port = hostname === "localhost" ? "3001" : "443";

  const fetchProducts = async () => {
    const { data } = await Axios.get(
      `${protocol}//${hostname}:${port}/api/items/`
    );
    const products = data;
    setProducts(products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="App">
      <Title />
      <MapComponent />
    </div>
  );
}

export default App;
