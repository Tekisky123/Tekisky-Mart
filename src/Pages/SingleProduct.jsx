import React, { useContext, useEffect, useState } from "react";
import "../Assets/Styles/SingleProduct.css";
import "../Assets/Styles/Style.scss";
import { Link, useParams } from "react-router-dom";
import "../Assets/Styles/Style.scss";
import {
  FaCartPlus,
  FaFacebook,
  FaPinterest,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { Context } from "../Context/Context";

const SingleProduct = () => {
  const [imgId, setImgId] = useState(1);
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState(null);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { handleAddToCart } = useContext(Context);
  const [selectedSize, setSelectedSize] = useState("250g");

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://tekisky-mart.onrender.com/admin/getoneproduct/${id}`
        );
        setProductData(response.data.getOneProduact);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        // Handle error, e.g., redirect to an error page or display an error message
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const imgs = document.querySelectorAll(".img-select a");
    const imgBtns = [...imgs];

    const intervalId = setInterval(() => {
      setImgId((prevId) => (prevId % imgBtns.length) + 1);
      slideImage();
    }, 3000);

    imgBtns.forEach((imgItem) => {
      imgItem.addEventListener("click", (event) => {
        event.preventDefault();
        setImgId(parseInt(imgItem.dataset.id, 10));
        clearInterval(intervalId);
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

    return () => {
      imgBtns.forEach((imgItem) => {
        imgItem.removeEventListener("click", () => {});
      });

      window.removeEventListener("resize", slideImage);
      clearInterval(intervalId);
    };
  }, [imgId, productData]); // Include productData in the dependency array

  return (
    <div className="single-main-container">
      {loading ? (
        <p>Loading...</p>
      ) : productData ? (
        <>
          <div className="first-image-container">
            <h2 className="first-container-heading">
              {productData.productName}
            </h2>
          </div>
          <div className="product-card-wrapper">
            <div className="product-card">
              <div className="product-imgs">
                <div className="img-display">
                  <div className="img-showcase">
                    {productData.imageURL.map((url, index) => (
                      <img key={index} src={url} alt={`Product ${index + 1}`} />
                    ))}
                  </div>
                </div>
                <div className="img-select">
                  {productData.imageURL.map((_, index) => (
                    <div
                      key={index}
                      className={`img-item ${
                        index + 1 === imgId ? "selected" : ""
                      }`}
                    >
                      <Link data-id={index + 1}>
                        <img
                          src={productData.imageURL[index]}
                          alt={`Product ${index + 1}`}
                        />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <div className="product-content">
                <h2 className="product-title">{productData.productName}</h2>
                <div className="product-rating">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i + 1 <= productData.productRating ? "filled" : ""
                      }
                    />
                  ))}
                  <span>
                    {productData.productRating} ({productData.reviewCount})
                  </span>
                </div>
                <div className="product-price">
                  <p className="last-price">
                    Old Price: <span>₹{productData.mrp}</span>
                  </p>
                  <p className="new-price">
                    New Price:{" "}
                    <span>
                      ₹{productData.offerPrice} ({productData.discount}%)
                    </span>
                  </p>
                </div>
                <div className="product-detail">
                  <h2>About this item:</h2>
                  <p>{productData.description}</p>
                </div>
                <div>
                  <form className="size-form">
                    <label
                      className={`size-label ${
                        selectedSize === "250g" ? "selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="productSize"
                        value="250g"
                        checked={selectedSize === "250g"}
                        onChange={handleSizeChange}
                      />
                      250g
                    </label>
                    <label
                      className={`size-label ${
                        selectedSize === "500g" ? "selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="productSize"
                        value="500g"
                        checked={selectedSize === "500g"}
                        onChange={handleSizeChange}
                      />
                      500g
                    </label>
                    <label
                      className={`size-label ${
                        selectedSize === "1kg" ? "selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="productSize"
                        value="1kg"
                        checked={selectedSize === "1kg"}
                        onChange={handleSizeChange}
                      />
                      1kg
                    </label>
                    <label
                      className={`size-label ${
                        selectedSize === "5kg" ? "selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="productSize"
                        value="5kg"
                        checked={selectedSize === "5kg"}
                        onChange={handleSizeChange}
                      />
                      5kg
                    </label>
                  </form>
                </div>
                <div className="purchase-info">
                  <div className="c-counter-btn">
                    <span className="minus" onClick={decrement}>
                      <FaMinus />
                    </span>
                    <span className="qty">{quantity}</span>
                    <span className="plus" onClick={increment}>
                      <FaPlus />
                    </span>
                  </div>
                  {/* <button type="button" className="btn">
                    Add to Cart <FaCartPlus className="cart-icon" />
                  </button> */}
                  <button
                    className="btn"
                    onClick={() => {
                      handleAddToCart(productData, quantity);
                      setQuantity(1);
                    }}
                  >
                    <FaCartPlus /> ADD TO CART
                  </button>
                </div>

                <div>
                  <button className="checkoutBtn">Proceed To Checkout</button>
                </div>
                <div>
                  
                </div>
                <div className="social-links">
                  <p>Share At: </p>
                  <Link>
                    <FaFacebook className="facebook" />
                  </Link>
                  <Link>
                    <AiFillTwitterCircle className="twitter" />
                  </Link>
                  <Link>
                    <IoLogoWhatsapp className="whatsapp" />
                  </Link>
                  <Link>
                    <FaPinterest className="pinterest" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="details-container">
            <div className="details-buttons">
              <button>Description</button>
              <button>Reviews ({productData.reviewCount || 0})</button>
            </div>
            <div className="data-container">
              <h2>Description</h2>
              <p>{productData.description}</p>
              <ul>
                <li>
                  Dates are great energy boosters as they contain natural sugar
                  like glucose, sucrose and fructose. To get more advantage add
                  dates to milk and make it a very nutritious snack. Dates are
                  very low in calories and are extremely suitable for
                  health-conscious people.
                </li>
                <li>It helps improve the digestive system.</li>
                <li>
                  Dates are free from cholesterol and contain very low fat.
                  Dates are rich in vitamins and minerals.
                </li>
                <li>
                  Dates help in weight gain and are also high in antioxidants,
                  which may contribute to many of their health benefits
                </li>
                <li>Pack contains: 250g | Best Before 12 Months</li>
              </ul>
            </div>
            <div className="cx-single">
              <div className="B-Saller">
                <h3>Related products</h3>
                <div className="mainSaller">
                  <Row>
                    <Col xs={12} md={6} xl={3}>
                      <div className="Saller">
                        <div className="subSaller">
                          <img
                            src="https://grocerkid.com/wp-content/uploads/2021/10/kimia-dates.jpg"
                            alt=""
                          />
                          <div className="BestSellerDetails">
                            <h6>Kimia Dates</h6>
                            <p>₹310.00</p>
                            <button>Add to cart</button>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} md={6} xl={3}>
                      <div className="Saller">
                        <div className="subSaller">
                          <img
                            src="https://grocerkid.com/wp-content/uploads/2021/10/kimia-dates.jpg"
                            alt=""
                          />
                          <div className="BestSellerDetails">
                            <h6>Kimia Dates</h6>
                            <p>₹310.00</p>
                            <button>Add to cart</button>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} md={6} xl={3}>
                      <div className="Saller">
                        <div className="subSaller">
                          <img
                            src="https://grocerkid.com/wp-content/uploads/2021/10/kimia-dates.jpg"
                            alt=""
                          />
                          <div className="BestSellerDetails">
                            <h6>Kimia Dates</h6>
                            <p>₹310.00</p>
                            <button>Add to cart</button>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} md={6} xl={3}>
                      <div className="Saller">
                        <div className="subSaller">
                          <img
                            src="https://grocerkid.com/wp-content/uploads/2021/10/kimia-dates.jpg"
                            alt=""
                          />
                          <div className="BestSellerDetails">
                            <h6>Kimia Dates</h6>
                            <p>₹310.00</p>
                            <button>Add to cart</button>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default SingleProduct;
