import React, { useEffect, useRef } from "react";
import "./css/Banner.css";

function Banner() {
  const primaryNavRef = useRef(null);
  const navToggleRef = useRef(null);

  useEffect(() => {
    function toggleNav() {
      const visibility = primaryNavRef.current.getAttribute('data-visible');
      const isVisible = visibility === "true";

      primaryNavRef.current.setAttribute('data-visible', isVisible ? "false" : "true");
      navToggleRef.current.setAttribute("aria-expanded", !isVisible ? "true" : "false");
    }

    navToggleRef.current.addEventListener("click", toggleNav);

    return () => {
      navToggleRef.current.removeEventListener("click", toggleNav);
    };
  }, []);

  return (
    <header>
      <nav className="navbar">
        <button ref={navToggleRef} className="mobile-nav-toggle" aria-controls="navbar" area-expanded="false">
          <span className="sr-only">Menu</span>
          <span className="mobile-nav-toggle-top"></span>
          <span className="mobile-nav-toggle-middle"></span>
          <span className="mobile-nav-toggle-bottom"></span>
        </button>
        <ul ref={primaryNavRef} className="tabs" data-visible="false">
          <li><a className="first-tab nostyle" lang="en">Mission & Vision</a></li>
          <li><div className="empty"></div></li>
          <li><a className="tab nostyle" lang="en">Home</a></li>
          <li><a className="tab nostyle" lang="en">Data Solutions</a></li>
          <li><a className="tab nostyle" lang="en">About</a></li>
          <li><a className="tab nostyle" lang="en">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Banner;
