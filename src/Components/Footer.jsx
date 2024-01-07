import '../Assets/Styles/Footer.css'
import { CiLocationOn } from "react-icons/ci";
import { MdEmail } from "react-icons/md";

import logo from "../Assets/Images/main-logo.png";

const Footer = () => {
    return (
        <>
            <footer className='maindiv'>
                <div>
                    <img src={logo} alt="Logo" className='footer-logo' />
                </div>
                <div className="main-content">
                    <h3 className='phone-div'>✆ Phone <br />+91 6281017334 - +91 7842363997</h3>
                    <h3 className='location-div'> <CiLocationOn /> Address <br /> Workshop corner Nanded Maharashtra</h3>
                    <h3 className='location-div'> <MdEmail /> Email <br />Hr@tekisky.com</h3>
                </div>

                <div className='Border-line'>
                    <div className='Headings'>
                        <h>
                            Sarah International is one of <br />
                            the  leading  importers of <br />
                            Dates in India. Established <br /> in 1988 by Mr. Gulam Ahmed <br />
                            Godil.
                        </h><br /><br />
                        <div>
                            <h4>Quick Link</h4>
                            <br />
                            <ul>
                                <li>Home</li>
                                <li>About us</li>
                                <li>Products</li>
                                <li>Contact us</li>

                            </ul>
                        </div>
                        <div>
                            <h4>Categories </h4>
                            <br />
                            <ul>
                                <li>Dates</li>
                                <li>Dry Dates</li>
                                <li>Dry Fruits</li>
                                <li>stuffed Dates</li>

                            </ul>
                        </div>
                        <div>
                            <h4>My Account </h4>
                            <br />
                            <ul>
                                <li> Login / Signup</li>
                                <li>Cart</li>
                                <li>Checkout</li>
                                <li>My Account</li>

                            </ul>
                        </div>
                        <div>
                            <h4>Policies</h4>
                            <br />
                            <ul>
                                <li>Terms & Condition</li>
                                <li>Privacy Policy</li>
                                <li>Shopping Polici</li>
                                <li>Return & Refund</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer;