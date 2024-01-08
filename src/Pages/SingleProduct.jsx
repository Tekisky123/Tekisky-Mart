import React, { useEffect, useState } from "react";
import "../Assets/Styles/SingleProduct.css";
import dates1 from "../Assets/Images/dates1.jpg";
import dates2 from "../Assets/Images/dates2.jpg";
import dates3 from "../Assets/Images/dates3.jpg";
import dates4 from "../Assets/Images/dates4.jpg";
import { Link } from "react-router-dom";
import {
  FaCartPlus,
  FaFacebook,
  FaPinterest,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";

const SingleProduct = () => {
  const [imgId, setImgId] = useState(1);

  const [loading, setLoading] = useState(true);

  // Simulate data loading or any asynchronous operation
  useEffect(() => {
    const fetchData = async () => {
      // Simulate a delay
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const imgs = document.querySelectorAll(".img-select a");
    const imgBtns = [...imgs];

    const intervalId = setInterval(() => {
      setImgId((prevId) => (prevId % imgBtns.length) + 1);
      slideImage();
    }, 3000); // Adjust the interval duration (in milliseconds) as needed

    imgBtns.forEach((imgItem) => {
      imgItem.addEventListener("click", (event) => {
        event.preventDefault();
        setImgId(parseInt(imgItem.dataset.id, 10));
        clearInterval(intervalId); // Clear the interval on manual image change
        slideImage();
      });
    });

    function slideImage() {
      const displayWidth = document.querySelector(
        ".img-showcase img:first-child"
      ).clientWidth;

      document.querySelector(".img-showcase").style.transform = `translateX(${
        -(imgId - 1) * displayWidth
      }px)`;
    }

    window.addEventListener("resize", slideImage);

    // Clean up event listeners on component unmount
    return () => {
      imgBtns.forEach((imgItem) => {
        imgItem.removeEventListener("click", () => {});
      });

      window.removeEventListener("resize", slideImage);
      clearInterval(intervalId);
    };
  }, [imgId]);
  return (
    <>
      <div className="first-image-container">
        <h2 className="first-container-heading">Arsh Safawi AL Madina Dates</h2>
      </div>
      <div className="card-wrapper">
        <div className="card">
          {/* card left */}
          <div className="product-imgs">
            <div className="img-display">
              <div className="img-showcase">
                <img src={dates1} alt="" />
                <img src={dates2} alt="" />
                <img src={dates3} alt="" />
                <img src={dates4} alt="" />
              </div>
            </div>
            <div className="img-select">
              <div className="img-item">
                <Link data-id="1">
                  {/* <img src={dates1} alt="" />{" "} */}
                </Link>
              </div>
              <div className="img-item">
                <Link data-id="2">
                  <img src={dates2} alt="" />{" "}
                </Link>
              </div>
              <div className="img-item">
                <Link data-id="3">
                  <img src={dates3} alt="" />{" "}
                </Link>
              </div>
              <div className="img-item">
                <Link data-id="4">
                  <img src={dates4} alt="" />{" "}
                </Link>
              </div>
            </div>
          </div>
          {/* card right */}
          <div className="product-content">
            <h2 className="product-title">
              Arsh Dry Dates Brown | Healthy and Tasty Dry Fruit Nut | 1000g
            </h2>
            <div className="product-rating">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
              <span>4.7(21)</span>
            </div>

            <div className="product-price">
              <p className="last-price">
                Old Price: <span>₹325.00</span>
              </p>
              <p className="new-price">
                New Price: <span>₹210.00 (5%)</span>
              </p>
            </div>

            <div className="product-detail">
              <h2>about this item: </h2>
              <p>
                ARSH brings to you a range of premium quality Dates, nuts and
                dry fruits. ARSH Brown dry dates are packed in a food grade
                pouch to retain freshness, taste and texture ensuring premium
                quality products in your hands.
              </p>
              <p>
                All ARSH Dates, nuts and dry fruits are hygienically packed in a
                facility meeting food safety standards.
              </p>
              <ul>
                <li>
                  Color: <span>Brown</span>
                </li>
                <li>
                  Available: <span>in stock</span>
                </li>
                <li>
                  Category: <span>Dates</span>
                </li>
                <li>
                  Shipping Area: <span>All over the world</span>
                </li>
                <li>
                  Shipping Fee: <span>Free</span>
                </li>
              </ul>
            </div>

            <div className="purchase-info">
              <input type="number" min="0" value="1" />
              <button type="button" className="btn">
                Add to Cart 
              <FaCartPlus className="cart-icon"/>
              </button>
              
            </div>

            <div className="social-links">
              <p>Share At: </p>
              <Link>
                <FaFacebook className="facebook"/>
              </Link>
              <Link>
                <AiFillTwitterCircle className="twitter" />
              </Link>
             
              <Link>
                <IoLogoWhatsapp className="whatsapp"/>
              </Link>
              <Link>
                <FaPinterest className="pinterest" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
