import React from "react";
import "../Assets/Styles/ContactUs.css";
import 'leaflet/dist/leaflet.css';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";


const ContactUs = () => {

  return (
    <>
      <div className="first-image-container">
        <h2 className="first-container-heading">CONTACT US</h2>
      </div>
      <div className="about-card-container">
        <div className="about-card">
        <FaLocationDot className="location-icon"/>
          <h2>Address</h2>
        
          <p>
            2nd floor, opposite WaterTank,<br /> WorkShop Corner, Nanded,<br /> Maharashtra
            431605 INDIA
          </p>
        </div>
        <div className="about-card">
        <FaPhoneAlt className="phone-icon" />
          <h2>Phone</h2>
          
          <p> +91 8625817334</p>
          <p> +91 9890796149</p>
        </div>
        <div className="about-card">
        <MdOutlineAlternateEmail className="email-icon" />
          <h2>Email</h2>
          
          <p>hr@tekisky.com</p>
        </div>
      </div>
      <div className="second-about-container">
     
      </div>

    </>
  );
};

export default ContactUs;
