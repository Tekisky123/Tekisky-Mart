import React, { useContext, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Context } from "../Context/Context";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';

// import img from "../assets/images/watch-prod-3.webp";
// import { Context } from "../context/Context";
// import { API_BASE_URL } from "../api/api";

const Cart = () => {
  const {
    cartItems,
    handleRemoveFromCart,
    cartSubTotal,
    handleCartProductQuantity,
  } = useContext(Context);

  const navigate = useNavigate()

  return (
    <div className="cx-cart m-4">
      <Row>
        <Col xs={12} md={12} xl={12}>
          <div className="cx-heading">
            <h3>Shipping Cart</h3>
          </div>
        </Col>
        <Col xs={12} md={8} xl={8}>
          <div className="cart-item-wrapper">
            {cartItems.map((item) => (
              <div className="item-wrapper" key={item._id}>
                <div className="p-img">
                  <img src={item.imageURL[0]} alt="" />
                </div>

                <div className="p-name">
                  <p>{item.productName}</p>
                </div>
                <div className="p-counter">
                  <span
                    className="minus"
                    onClick={() => handleCartProductQuantity("dec", item)}
                  >
                    <FaMinus />
                  </span>
                  <span className="qty">{item.availablePackQty}</span>
                  <span
                    className="plus"
                    onClick={() => handleCartProductQuantity("inc", item)}
                  >
                    <FaPlus />
                  </span>
                </div>
                <div className="p-price">
                  <span>{item.availablePackQty}</span> x{" "}
                  <span>{item.mrp} &#8377;</span>
                </div>
                <div className="remove-btn">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveFromCart(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Col>
        <Col xs={12} md={4} xl={4}>
          <div className="item-total totalCart">
            <h4 style={{marginBottom:"1rem"}}>
              Cart Total
              
            </h4>
            <div>
<h5 className="totalDiv"><span>Subtotal</span><span>{cartSubTotal} &#8377;</span></h5>
<h5 style={{fontWeight:"600",marginBottom:"1rem"}}>Shipping</h5>
<h6 style={{color:"gray"}}>free delivery for order above 500
delivery charge 20 rs
</h6>
<h6 style={{color:"gray",marginBottom:"1rem"}}><span>flate Rate :</span><span>&#8377; 60.00</span></h6>
<h6 style={{fontWeight:"600",marginBottom:"1rem"}}>Shipping to maharashtra</h6>
<h5 style={{fontWeight:"600",marginBottom:"1rem"}} className="totalDiv"><span>Total</span><span>{cartSubTotal} &#8377;</span></h5>
<button style={{width:"100%",marginBottom:"0.5rem"}} className="checkoutBtn" onClick={()=>navigate('/payment_step')}>Proceed To Checkout</button>

            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
