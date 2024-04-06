import React, { useEffect, useRef } from "react";
import "./css/Banner.css";

function Banner() {
  return (
<div className="navbar">
  <div className="brand">Wischen & Mischen</div>
  <div className="spacer"></div> {/* This will take up the unused space */}
  <div className="nav-items">
    <div className="nav-item"><a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank">Home</a></div>
    <div className="nav-item"><a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank">Data Solutions</a></div>
    <div className="nav-item"><a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank">About</a></div>
    <div className="nav-item"><a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank">Contact</a></div>
    {/* Add more nav items as needed */}
  </div>
</div>

  );
}

export default Banner;
