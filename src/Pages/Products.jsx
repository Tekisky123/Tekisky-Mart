import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import "../Assets/Styles/Products.css";
import "../Assets/Styles/Style.scss";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://tekisky-mart.onrender.com/admin/getproduct');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='main-page cx-Home'>
      <div className="first-image-container">
        <h2 className="first-container-heading">Shop</h2>
      </div>
      <div className="B-Saller">
        <h3>Best Sellers</h3>
        <div className="mainSaller">
          <Row>
            {products.map((product) => (
              <Col key={product._id} xs={12} md={6} xl={3}>
                <div className="Saller">
                  <div className="subSaller">
                    <img src={product.imageURL} alt={product.productName} />
                    <div className="BestSellerDetails">
                      <h6>{product.productName}</h6>
                      <p>₹{product.mrp.toFixed(2)}</p>
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
