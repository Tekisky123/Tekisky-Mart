import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import "../Assets/Styles/Products.css";
import "../Assets/Styles/Style.scss";
import { Navigate, useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
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
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="main-page cx-Home" >
      <div className="first-image-container">
        <h2 className="first-container-heading">Shop</h2>
      </div>
      <div className="B-Saller">
        <h3>Best Sellers</h3>
        <div className="mainSaller">
          <Row>
            {products.map((products) => (
              <Col key={products._id} xs={12} md={6} xl={3}>
                <div className="Saller"  onClick={() => navigateToSingleProduct(products._id)}>
                  <div className="subSaller">
                    <img
                      src={products.imageURL[0]}
                      alt={products.productName}
                    />
                    <div className="BestSellerDetails">
                      <h6>{products.productName}</h6>
                      <p>₹{parseFloat(products.offerPrice).toFixed(2)}</p>
                      <button>Add to cart</button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Products;
