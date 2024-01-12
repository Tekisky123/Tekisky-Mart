import React, { useState, useRef, useEffect, useContext } from "react";
import { FaCartArrowDown, FaHeart, FaUser, FaWhatsapp } from "react-icons/fa";

import { BiSolidSearchAlt2 } from "react-icons/bi";
import "../Assets/Styles/Header.css";
import logo from "../Assets/Images/main-logo-copy.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { Context } from "../Context/Context";

const Header = () => {
  // const primaryNavRef = useRef(null);
  // const toggleButtonRef = useRef(null);
  // const [isExpanded, setIsExpanded] = useState(false);

  // const handleToggleClick = () => {
  //   setIsExpanded((prev) => !prev);
  // };

  // const handleContainerClick = (e) => {
  //   if (
  //     primaryNavRef.current &&
  //     !primaryNavRef.current.contains(e.target) &&
  //     toggleButtonRef.current &&
  //     !toggleButtonRef.current.contains(e.target)
  //   ) {
  //     setIsExpanded(false);
  //   }
  // };

  // useEffect(() => {
  //   const primaryNav = primaryNavRef.current;
  //   const toggleButton = toggleButtonRef.current;

  //   toggleButton.addEventListener("click", handleToggleClick);

  //   document.addEventListener("click", handleContainerClick);

  //   return () => {
  //     toggleButton.removeEventListener("click", handleToggleClick);
  //     document.removeEventListener("click", handleContainerClick);
  //   };
  // }, []);
  const navigate = useNavigate();
  const { cartItems, ToastContainer, toast } = useContext(Context);

  return (
    <div className="header-main-container">
      <div className="header-top">
        <div className="nav-contact">
          <h6 className="nav-number">
            <FaWhatsapp /> +91 8421048203
          </h6>
          <h6 className="nav-number">
            <MdEmail /> syed8040@gmail.com
          </h6>
        </div>
        <Link to={"/"}>
          <img src={logo} alt="" className="header-logo" />
        </Link>
        <div className="header-icons">
          {/* <BiSolidSearchAlt2 className="header-icon" /> */}
          <button className="icons cart-btn" onClick={() => navigate("/cart")}>
            <span>{cartItems.length}</span>
            <FaCartArrowDown className="header-icon"/>
          </button>
          <FaUser className="header-icon" />
        </div>
      </div>
      <div className="header-bottom">
        <ul>
          <li>
            <Link className="nav-link" to="/">
              HOME
            </Link>
          </li>
          <li>
            {" "}
            <Link className="nav-link" to="/about">
              ABOUT
            </Link>
          </li>
          <li>
            {" "}
            <Link className="nav-link" to="/products">
              PRODUCTS
            </Link>
          </li>
          <li>
            {" "}
            <Link className="nav-link" to="/contact-us">
              CONTACT US
            </Link>
          </li>
        </ul>
      </div>
    </div>
    //  <div className="main-container">
    //     <header className="site-header">
    //       <div className="header__content--flow">
    //         <section className="header-content--left">
    //           <a href="#" className="brand-logo">
    //             <span className="">
    //               <img src={logo} alt="" className="logo" />
    //             </span>
    //           </a>
    //           <button className="nav-toggle" ref={toggleButtonRef}>
    //             <span className="toggle--icon"></span>
    //           </button>
    //         </section>
    //         <section className="header-content--center">
    //           {/* Search Bar with Search Icon */}

    //         </section>
    //         <section className="header-content--right">
    //           {/* Icons for Cart, Favorites, and Profile */}
    //           <div className="header-icons">
    //           <BiSolidSearchAlt2  className="header-icon" />
    //             <FaShoppingCart className="header-icon" />
    //             <FaHeart className="header-icon" />
    //             <FaUser className="header-icon" />
    //           </div>

    //           <nav className="header-nav" role="navigation">
    //             <ul
    //               className="nav__list"
    //               aria-expanded={isExpanded ? "true" : "false"}
    //               ref={primaryNavRef}
    //             >
    //               <li className="list-item">
    //                 <a className="nav__link" to="/">
    //                   Home
    //                 </a>
    //               </li>
    //               <li className="list-item">
    //                 <a className="nav__link" to="">
    //                   About
    //                 </a>
    //               </li>
    //               <li className="list-item">
    //                 <Link className="nav__link" to="/products">
    //                   Products
    //                 </Link>
    //               </li>

    //               <li className="list-item">
    //                 <Link className="nav__link" to="/contact-us">
    //                   Contact
    //                 </Link>
    //               </li>
    //             </ul>
    //           </nav>
    //         </section>
    //       </div>
    //     </header>
    //   </div>
  );
};

export default Header;
