import React, { useState, useContext } from "react";
import { FaCartArrowDown, FaHeart, FaUser, FaWhatsapp } from "react-icons/fa";
import { BiSolidSearchAlt2 } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "../Assets/Styles/Header.css";
import logo from "../Assets/Images/main-logo-copy.jpeg";
import { Context } from "../Context/Context";

const Header = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(Context);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  return (
    <div className="header-main-container">
    <div className="header-top">
      <div className="nav-contact">
        <h6 className="nav-number">
          <FaWhatsapp />  +91 8625817334 
        </h6>
        <h6 className="nav-number">
          <MdEmail /> hr@tekisky.com
        </h6>
      </div>
      <Link to={"/"}>
        <img src={logo} alt="" className="header-logo" />
      </Link>
      <div className="header-icons">
        <BiSolidSearchAlt2 className="header-icon" />
        <button className="icons cart-btn" onClick={() => navigate("/cart")}>
        <span>{cartItems ? cartItems.length : 0}</span>
          <FaCartArrowDown className="header-icon" />
        </button>
        <Link to={"/add-products"}><FaUser className="header-icon" /></Link>
        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <div className={`bar ${mobileMenuOpen ? "open" : ""}`}></div>
          <div className={`bar ${mobileMenuOpen ? "open" : ""}`}></div>
          <div className={`bar ${mobileMenuOpen ? "open" : ""}`}></div>
        </div>
      </div>
    </div>
    <div className={`header-bottom ${mobileMenuOpen ? "mobile-open" : ""}`}>
      <ul>
        <li>
          <Link className="nav-link" to="/" onClick={closeMobileMenu}>
            HOME
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/about" onClick={closeMobileMenu}>
            ABOUT
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/products" onClick={closeMobileMenu}>
            PRODUCTS
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/contact-us" onClick={closeMobileMenu}>
            CONTACT US
          </Link>
        </li>
      </ul>
    </div>
  </div>
);
};

export default Header;
