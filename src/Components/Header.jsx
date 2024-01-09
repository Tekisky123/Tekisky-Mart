import React, { useState, useRef, useEffect } from "react";
import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import { BiSolidSearchAlt2 } from "react-icons/bi";
import "../Assets/Styles/Header.css";
import logo from "../Assets/Images/main-logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const primaryNavRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleClick = () => {
    setIsExpanded((prev) => !prev);
  };
 

  const handleContainerClick = (e) => {
    if (
      primaryNavRef.current &&
      !primaryNavRef.current.contains(e.target) &&
      toggleButtonRef.current &&
      !toggleButtonRef.current.contains(e.target)
    ) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    const primaryNav = primaryNavRef.current;
    const toggleButton = toggleButtonRef.current;

    toggleButton.addEventListener("click", handleToggleClick);

    document.addEventListener("click", handleContainerClick);

    return () => {
      toggleButton.removeEventListener("click", handleToggleClick);
      document.removeEventListener("click", handleContainerClick);
    };
  }, []);

  return (
   <div className="main-container">
      <header className="site-header">
        <div className="header__content--flow">
          <section className="header-content--left">
            <a href="#" className="brand-logo">
              <span className="">
                <img src={logo} alt="" className="logo" />
              </span>
            </a>
            <button className="nav-toggle" ref={toggleButtonRef}>
              <span className="toggle--icon"></span>
            </button>
          </section>
          <section className="header-content--center">
            {/* Search Bar with Search Icon */}
          
          </section>
          <section className="header-content--right">
            {/* Icons for Cart, Favorites, and Profile */}
            <div className="header-icons">
            <BiSolidSearchAlt2  className="header-icon" />
              <FaShoppingCart className="header-icon cart-btn" > 
              <span className="badge">5</span>
              </FaShoppingCart>
              <FaHeart className="header-icon" />
              <FaUser className="header-icon" />
            </div>
            

            <nav className="header-nav" role="navigation">
              <ul
                className="nav__list"
                aria-expanded={isExpanded ? "true" : "false"}
                ref={primaryNavRef}
              >
                <li className="list-item">
                  <Link className="nav__link" to="/">
                    Home
                  </Link>
                </li>
                <li className="list-item">
                  <Link className="nav__link" to="/about-us">
                    About
                  </Link>
                </li>
                <li className="list-item">
                  <Link className="nav__link" to="/products">
                    Products
                  </Link>
                </li>
               
                <li className="list-item">
                  <Link className="nav__link" to="/contact-us">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </section>
        </div>
      </header>
    </div>
  );
};

export default Header;
