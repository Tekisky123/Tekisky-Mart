import React, { useState, useEffect, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import "../Assets/Styles/Products.css";
import "../Assets/Styles/Style.scss";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../Context/Context";

const Products = () => {
  
  const { handleAddToCart ,ToastContainer} = useContext(Context);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true); // Track loading state

  const navigate = useNavigate()

  const navigateToSingleProduct = (productId) => {
    navigate(`/single-product/${productId}`);
  };

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("https://tekisky-mart.onrender.com/admin/getproduct", {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.9,hi;q=0.8",
          Origin: "http://localhost:3000",
          Referer: "http://localhost:3000",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "cross-site",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      }) // Replace 'YOUR_NEW_API_ENDPOINT' with the actual API endpoint
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="main-page cx-Home">
    <div className="first-image-container">
      <h2 className="first-container-heading">Shop</h2>
    </div>
    <ToastContainer />
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
            products.map((product,index) => (
              <Col key={product._id} xs={12} md={6} xl={3}>
                <div className="Saller">
                  <div className="subSaller">
                    <img
                      onClick={() => navigateToSingleProduct(product._id)}
                      src={product.imageURL[index]}
                      alt={product.productName}
                    />
                    <div className="BestSellerDetails">
                      <h6>{product.productName}</h6>
                      <p>₹{parseFloat(product?.productDetails[index]?.offerPrice).toFixed(2)}</p>
                      <div className="buy-button">
                        <button
                          onClick={() => {
                            handleAddToCart(product, quantity,index);
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
  </div>
  );
};

export default Products;
