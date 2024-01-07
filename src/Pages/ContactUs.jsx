import React from "react";
import "../Assets/Styles/ContactUs.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";


const ContactUs = () => {
    const position = [19.1608, 77.3145]; // Adjust the coordinates based on the actual location

  return (
    <>
      <div className="first-image-container">
        <h2 className="first-container-heading">CONTACT US</h2>
      </div>
      <div className="card-container">
        <div className="card">
        <FaLocationDot className="location-icon"/>
          <h2>Address</h2>
          <br />
          <br />
          <p>
            2nd floor, opposite WaterTank,<br /> WorkShop Corner, Nanded,<br /> Maharashtra
            431605 INDIA
          </p>
        </div>
        <div className="card">
        <FaPhoneAlt className="phone-icon" />
          <h2>Phone</h2>
          <br />
          <br />
          <p> +91 8625817334</p>
          <br />
          <p> +91 9890796149</p>
        </div>
        <div className="card">
        <MdOutlineAlternateEmail className="email-icon" />
          <h2>Email</h2>
          <br />
          <br />
          <p>hr@tekisky.com</p>
        </div>
      </div>
      <div className="second-about-container">
      <MapContainer center={position} zoom={15} style={{ width: '400px', height: '400px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Workshop Location</Popup>
      </Marker>
    </MapContainer>
\
      </div>

    </>
  );
};

export default ContactUs;
