import React, { useContext } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Context } from "../Context/Context";

// import img from "../assets/images/watch-prod-3.webp";
// import { Context } from "../context/Context";
// import { API_BASE_URL } from "../api/api";

const Cart = () => {
  const {
    cartItems,
    handleRemoveFromCart,
    cartSubTotal,
    handleCartProductQuantity
  } = useContext(Context);

  console.log("cartItems",cartItems)

  return (
    <div className="cx-cart container my-4">
      <div className="cx-heading">
        <h3>Shipping Cart</h3>
      </div>
      <div className="cart-item-wrapper">
      {cartItems.map((item) => (
        <div className="item-wrapper" key={item._id}>
          <div className="p-img">
            <img
              src={item.imageURL[0]} 
              alt=""
            />
          </div>

          <div className="p-name">
            <p>{item.productName}</p>
          </div>
          <div className="p-counter">
            <span className="minus" onClick={() => handleCartProductQuantity('dec', item)}>
              <FaMinus />
            </span>
            <span className="qty">{item.availablePackQty}</span>
            <span className="plus" onClick={() => handleCartProductQuantity('inc', item)}>
              <FaPlus />
            </span>
          </div>
          <div className="p-price">
            <span>{item.availablePackQty}</span> x <span>{item.mrp} &#8377;</span>
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
      <div className="item-total text-end">
        <h4>
          Cart Total:
           <span>
           {cartSubTotal} &#8377;
           </span>
        </h4>
        <button className="btn btn-primary">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
