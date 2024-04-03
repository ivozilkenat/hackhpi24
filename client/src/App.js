import React, { useState, useEffect } from "react";
import Axios from "axios";

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
    <div>
      {products.map((product) => (
        <p key={product.name}>{product.name}</p>
      ))}
    </div>
  );
}

export default App;
