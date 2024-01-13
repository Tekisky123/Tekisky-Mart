import React, { useContext, useEffect, useState } from "react";
import "../Assets/Styles/SingleProduct.css";
import "../Assets/Styles/Style.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../Assets/Styles/AddProductForm.css"
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
import { Base_Url, getAllProductAPI } from "../apis/Apis";

const SingleProduct = () => {
  const [imgId, setImgId] = useState(1);
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState(null);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const { handleAddToCart, ToastContainer } = useContext(Context);
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();

  const getRelatedProduct = async () => {
    try {
      const response = await axios.get(`${Base_Url}${getAllProductAPI}`);
      const data = response.data;
      if (data.success) {
        setRelatedProduct(data.products);
      } else {
        // Handle error if needed
        console.error("Error fetching data:", data.error);
      }
    } catch (error) {
      // Handle network error
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    getRelatedProduct();
  }, []);

  const navigateToSingleProduct = (productId) => {
    navigate(`/single-product/${productId}`);
  };

  const handleSizeChange = (event) => {
    const newSize = event.target.value;
    setSelectedSize(newSize);

    const selectedSizeData = productData?.productDetails.find(
      (details) => details.packetweight === newSize
    );

    if (selectedSizeData) {
      const { mrp, offerPrice } = selectedSizeData;
      setProductData((prevData) => ({
        ...prevData,
        selectedSize: {
          mrp: mrp,
          offerPrice: offerPrice || 0,
        },
      }));
    }
  };

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

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

  useEffect(() => {
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
      const imgShowcase = document.querySelector(".img-showcase");
  
      if (imgShowcase && imgShowcase.firstElementChild) {
        const displayWidth = imgShowcase.firstElementChild.clientWidth;
        imgShowcase.style.transform = `translateX(${
          -(imgId - 1) * displayWidth
        }px)`;
      }
    }
  
    window.addEventListener("resize", slideImage);
  
    return () => {
      imgBtns.forEach((imgItem) => {
        imgItem.removeEventListener("click", () => {});
      });
  
      window.removeEventListener("resize", slideImage);
      clearInterval(intervalId);
    };
  }, [imgId]);
  
  // Use a separate useEffect for setting the default size
  useEffect(() => {
    if (productData && !selectedSize) {
      const defaultSize = productData.productDetails[0]?.packetweight || "";
      setSelectedSize(defaultSize);
  
      const defaultSizeData = productData.productDetails.find(
        (details) => details.packetweight === defaultSize
      );
  
      if (defaultSizeData) {
        const { mrp, offerPrice } = defaultSizeData;
        setProductData((prevData) => ({
          ...prevData,
          selectedSize: {
            mrp: mrp,
            offerPrice: offerPrice || 0,
          },
        }));
      }
    }
  }, [productData, selectedSize]);
  

  

  return (
    <div className="single-main-container">
      <ToastContainer />
      {loading ? (
        <div className="loader-container">
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
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
                    MRP Price: <span>₹{productData.selectedSize?.mrp}</span>
                  </p>
                  <p className="new-price">
                    Offer Price:{" "}
                    <span>
                    ₹{productData.selectedSize?.offerPrice}
                    </span>
                  </p>
                </div>
                <div className="product-detail">
                  <h2>About this item:</h2>
                  <p>{productData.description}</p>
                </div>
                <div>
                <form className="size-form">
              {productData.productDetails.map((details, index) => (
                <label
                  key={index}
                  className={`size-label ${
                    selectedSize === details.packetweight ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="productSize"
                    value={details.packetweight}
                    checked={selectedSize === details.packetweight}
                    onChange={handleSizeChange}
                  />
                  {`${details.packetweight}`}
                </label>
              ))}
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
                  <button
                    className="checkoutBtn"
                    onClick={() => navigate("/payment_step")}
                  >
                    Proceed To Checkout
                  </button>
                </div>
                <div></div>
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
              {/* <p>{productData.description}</p> */}
              <ul>
                {Array.isArray(productData.description) ? (
                  productData.description.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <li>{productData.description}</li>
                )}
              </ul>
            </div>
            <div className="cx-single">
              <div className="B-Saller">
                <h3>Related products</h3>
                <div className="mainSaller">
                  <Row>
                    {relatedProduct.map((product) => (
                      <Col key={product._id} xs={12} md={6} xl={3}>
                        <div className="Saller">
                          <div className="subSaller">
                            <img
                              src={product.imageURL[0]}
                              alt={product.productName}
                              onClick={() =>
                                navigateToSingleProduct(product._id)
                              }
                            />
                            <div className="BestSellerDetails">
                              <h6>{product?.productName}</h6>
                              <p>₹{productData?.productDetails[0]?.offerPrice}</p>
                              <div className="buy-button">
                                <button
                                  onClick={() => {
                                    handleAddToCart(product, quantity);
                                  }}
                                >
                                  Add To Cart
                                </button>
                                <button>Buy Now</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
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
