import React, { useContext, useEffect, useState } from "react";
import "../Assets/Styles/Style.scss";
import OurCarousel from "./Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Testimonials from "./Testimonials";
import sale10 from "../Assets/Images/SALE10.jpg";
import sale30 from "../Assets/Images/SALE30.jpg";
import sale50 from "../Assets/Images/SALE50.jpg";
import sale70 from "../Assets/Images/SALE70.jpg";
import saleBanner from "../Assets/Images/salebanner.webp";
import { useNavigate } from "react-router-dom";
import { Base_Url, getAllProductAPI } from "../apis/Apis";
import axios from "axios";
import { Context } from "../Context/Context";


const Home = () => {

  const { handleAddToCart, ToastContainer } = useContext(Context);
  const navigate = useNavigate();
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [quantity, setQuantity] = useState(1);

  const getBestSellersData = async () => {
    try {
      const response = await axios.get(`${Base_Url}${getAllProductAPI}`);
      const data = response.data;
      if (data.success) {
        setBestSellers(data.products);
        setLoading(false); // Set loading to false after successful data fetch
      } else {
        // Handle error if needed
        console.error('Error fetching data:', data.error);
        setLoading(false); // Set loading to false in case of an error
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
      setLoading(false); // Set loading to false in case of a network error
    }
  };

  useEffect(() => {
    getBestSellersData();
  }, []);

  const navigateToSingleProduct = (productId) => {
    navigate(`/single-product/${productId}`);
  };

  return (
    <div className="cx-Home">
    <ToastContainer />
      <OurCarousel />
      <div className="P-category">
        <h3>Product Categories</h3>
        <div className="mainCategory">
          <Row>
            <Col xs={12} md={6} xl={3}>
              {" "}
              <div className="category">
                {" "}
                <div className="subcategory">
                  {" "}
                  <img
                    src="https://kouroshfoods.com/wp-content/uploads/2021/10/lUd7QXM01t83EXP0BRDblfJHWsgbYct78DMKRtWD.jpg"
                    alt=""
                  />
                  <p>Dates</p>
                </div>
              </div>{" "}
            </Col>
            <Col xs={12} md={6} xl={3}>
              <div className="category">
                {" "}
                <div className="subcategory">
                  {" "}
                  <img
                    src="https://img.freepik.com/free-photo/healthy-snack-collection-organic-nuts-fruit-generated-by-ai_188544-21443.jpg?t=st=1704548628~exp=1704552228~hmac=48eade933a2e4b5517e1f162b44a6b0b2b6d0c6923c5403cbb469069cd3616c3&w=1060"
                    alt=""
                  />
                  <p>Dry Fruits</p>
                </div>
              </div>{" "}
            </Col>
            <Col xs={12} md={6} xl={3}>
              <div className="category">
                {" "}
                <div className="subcategory">
                  {" "}
                  <img
                    src="https://img.freepik.com/free-photo/juicy-dates-wooden-plate-wooden-table-high-quality-photo_114579-26268.jpg?w=996&t=st=1704548441~exp=1704549041~hmac=0de6fc69958c7541f1c3e10ec16125ba6cbd8978529ff27cb3ac74c988b3160b"
                    alt=""
                  />
                  <p>Dry Dates</p>
                </div>
              </div>{" "}
            </Col>
            <Col xs={12} md={6} xl={3}>
              <div className="category">
                <div className="subcategory">
                  <img
                    src="https://www.tasteofhome.com/wp-content/uploads/2018/01/Festive-Stuffed-Dates_EXPS_RR22_25816_DR_12_09_6b-3.jpg"
                    alt=""
                  />
                  <p>Stuffed Dates</p>
                </div>
              </div>{" "}
            </Col>
          </Row>
        </div>
      </div>


      {/* <div className="c-tesimonals">
      <h3>Offers</h3>
      <div className="main-tesimonals">
      <Row>
            <Col xs={12} md={12} xl={12}>
              <div className="tesimonals">
                <div className="subtesimonals">
                <img
                    src={saleBanner}
                    alt=""
                  />
                </div>
              </div>{" "}
            </Col>
            <Col xs={12} md={6} xl={3}>
              <div className="tesimonals">
                <div className="subtesimonals">
                <img
                    src={sale10}
                    alt=""
                  />
                </div>
              </div>{" "}
            </Col>
            <Col xs={12} md={6} xl={3}>
              <div className="tesimonals">
                <div className="subtesimonals">
                <img
                    src={sale30}
                    alt=""
                  />
                </div>
              </div>{" "}
            </Col>
            <Col xs={12} md={6} xl={3}>
              <div className="tesimonals">
                <div className="subtesimonals">
                <img
                    src={sale50}
                    alt=""
                  />
                </div>
              </div>{" "}
            </Col>
            <Col xs={12} md={6} xl={3}>
              <div className="tesimonals">
                <div className="subtesimonals">
                <img
                    src={sale70}
                    alt=""
                  />
             
                </div>
              </div>{" "}
            </Col>

          </Row>
      </div>
    </div> */}


<div className="B-Saller">
        <h3>Best Sellers</h3>
        <div className="mainSaller">
          <Row>
            {loading ? (
              // Render skeleton loading cards while data is being fetched
              Array.from({ length: 8 }).map((_, index) => (
                <Col key={index} xs={12} md={6} xl={3}>
                  <div className="Saller product-card-skeleton" />
                </Col>
              ))
            ) : (
              // Render actual product cards when data is available
              bestSellers.map((product) => (
                <Col key={product._id} xs={12} md={6} xl={3}>
                  <div className="Saller">
                    <div className="subSaller">
                      <img
                        src={product.imageURL[0]}
                        alt={product.productName}
                        onClick={() => navigateToSingleProduct(product._id)}
                      />
                      <div className="BestSellerDetails">
                        <h6>{product.productName}</h6>
                        <p>₹{product?.productDetails[0]?.offerPrice}</p>
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
              ))
            )}
          </Row>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Home;
