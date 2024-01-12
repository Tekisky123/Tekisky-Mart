import React, { useContext, useEffect, useState } from "react";
import "../Assets/Styles/Style.scss";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/Context";
import Modal from 'react-modal';
import { Base_Url, saveOrderProductAPI } from "../apis/Apis";
import axios from "axios";

const PaymentStep = () => {

  const {
    cartItems,
    handleRemoveFromCart,
    cartSubTotal,
    handleCartProductQuantity,
  } = useContext(Context);
  const [status, setStatus] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    houseNo: "",
    area: "",
    landMark: "",
    addressType: "",
    additionalAdd: "",

  });
  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    AlternateNumber: "",
    email: "",
    houseNo: "",
    area: "",
    landMark: "",
    addressType: "",
    additionalAdd: "",
  });
  console.log("formData", formData);

  
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = () => {
    // Handle form submission and order details here
    console.log('Form data:', formData);
    console.log('Order details:', cartItems);
    closeModal(); // Close the modal after submission
  };


 

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (
      name === "phoneNumber" ||
      name === "AlternateNumber" 
    ) {
      // Remove any non-digit characters (except '-')
      const numericValue = value.replace(/[^0-9-]/g, "");

      // Ensure the length does not exceed 10 digits
      const maxLength = 10;
      const truncatedValue = numericValue.slice(0, maxLength);

      // Parse the numeric value as an integer
      const intValue = parseInt(truncatedValue, 10);

      // Check if the parsed value is a positive number
      const isValidNumber = !isNaN(intValue) && intValue >= 0;

      // Update form data and errors accordingly
      setFormData((prevData) => ({
        ...prevData,
        [name]: isValidNumber ? truncatedValue : "",
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: isValidNumber ? "" : "Please enter a valid 10-digit number",
      }));
    } else if (
      name === "aadharNumber" ||
      name === "pincode" ||
      name === "rationCardNo"
    ) {
      // Remove any non-digit characters
      const numericValue = value.replace(/[^0-9]/g, "");

      // Check if the length does not exceed the specified limit
      const maxLength =
        name === "aadharNumber" ? 12 : name === "pincode" ? 6 : 16;
      const truncatedValue = numericValue.slice(0, maxLength);

      // Update form data with the truncated value
      setFormData((prevData) => ({ ...prevData, [name]: truncatedValue }));
    } else if (name === "age") {
      const ageValue = parseInt(value, 10);

      // Check if the value is within the desired range (1 to 120)
      const isValidAge = !isNaN(ageValue) && ageValue >= 1 && ageValue <= 120;

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: isValidAge ? "" : "Age must be between 1 and 120",
      }));

      // Update form data with the validated value
      setFormData((prevData) => ({
        ...prevData,
        [name]: isValidAge ? ageValue : "",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handlePrevious=()=>{
    setStatus(status - 1);
  }

  const handleNext1 = (e) => {
    e.preventDefault();
    var requiredFields = ["phoneNumber"];

    let hasError = false;

    console.log(hasError);

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: " ",
        }));
        hasError = true;
      }
    });

    if (hasError) {
      alert("Mandatory fields are required");
    }
    if (!hasError) {
      setStatus(status + 1);
    }
  };
  const handleNext2 = (e) => {
    e.preventDefault();
    var requiredFields = [
      "fullName",
      // "AlternateNumber",
      // "email",
      // "houseNo",
      // "area",
      // "landMark",
      // "addressType",
      "additionalAdd",
    ];

    let hasError = false;

    console.log(hasError);

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: " ",
        }));
        hasError = true;
      }
    });

    if (hasError) {
      alert("Mandatory fields are required");
    }
    if (!hasError) {
      openModal()
    }
  };

  const renderProgressBar = () => {
    const steps = [
      "Phone Number",
      "Delivery Address",
      // "payment Method",
      // "Disease Details",
    ];
    return (
      <div className="progress-bar">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${
              // status === index + 1
              status === index ? "active" : status > index && "completed"
            }`}
          >
            {step}
          </div>
        ))}
      </div>
    );
  };

  const handleSaveOrder = async () => {
    try {
      const payload={}
      const response = await axios.post(`${Base_Url}${saveOrderProductAPI}${payload}`);
      const data = response.data;
      if (data.success) {
        // setBestSellers(data.products);
      } else {
        // Handle error if needed
        console.error('Error fetching data:', data.error);
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
    }
  };

  useEffect(() => {
    handleSaveOrder();
  }, []);

  return (
    <div>
      <div className="first-image-container">
        <h2 className="first-container-heading">Payment Step</h2>
      </div>
      <div className="stepContiner">
        {renderProgressBar()}
        <div style={{ width: "80%", margin: " 80px auto" }}>
          <form action="">
            {status === 0 ? (
              <>
                <Row className="Row">
                  <Col xs={12} md={4} xl={4}>
                    {" "}
                    <div className="Formlabel">
                      Enter Your Mobile Number
                      <span className="error-message">⁕</span>{" "}
                    </div>
                  </Col>
                  <Col xs={12} md={6} xl={6}>
                    <input
                      type="number"
                      className="MyInput"
                      placeholder="Phone Number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col xs={12} md={6} xl={6}></Col>
                  <Col xs={12} md={6} xl={6}>
                    {" "}
                    <div style={{ float: "right", margin: "10px" }}>
                      {" "}
                      <button className="NextBtn" onClick={()=>navigate('/cart')}>
                        Previous
                      </button>
                      <button className="NextBtn" onClick={handleNext1}>
                        Next
                      </button>
                    </div>
                  </Col>
                </Row>
              </>
            ) : status === 1 ? (
              <>
                <div>
                  <Row className="Row">

                  <Col xs={12} md={4} xl={4}>
                    {" "}
                    <div className="Formlabel">
                       Name
                      <span className="error-message">⁕</span>{" "}
                    </div>
                  </Col>
                  <Col xs={12} md={6} xl={6}>
                    <input
                      type="text"
                      className="MyInput"
                      placeholder="Enter Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col xs={12} md={4} xl={4}>
                    {" "}
                    <div className="Formlabel">
                    Alternate Mobile Number
                      {/* <span className="error-message">⁕</span>{" "} */}
                    </div>
                  </Col>
                  <Col xs={12} md={6} xl={6}>
                    <input
                      type="number"
                      className="MyInput"
                      placeholder="Enter Alternate Mobile Number"
                      name="AlternateNumber"
                      value={formData.AlternateNumber}
                      onChange={handleInputChange}
                    />
                  </Col>
                  {/* <Col xs={12} md={4} xl={4}>
                    {" "}
                    <div className="Formlabel">
                    Email Address
                      <span className="error-message">⁕</span>{" "}
                    </div>
                  </Col> */}
                  {/* <Col xs={12} md={6} xl={6}>
                    <input
                      type="email"
                      className="MyInput"
                      placeholder="Enter Email Adress"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </Col> */}
                  {/* <Col xs={12} md={4} xl={4}>
                    {" "}
                    <div className="Formlabel">
                    House No, Bulding ,Company ,Appartment
                      <span className="error-message">⁕</span>{" "}
                    </div>
                  </Col>
                  <Col xs={12} md={6} xl={6}>
                    <input
                      type="text"
                      className="MyInput"
                      placeholder="Enter House No, Bulding ,Company ,Appartment"
                      name="houseNo"
                      value={formData.houseNo}
                      onChange={handleInputChange}
                    />
                  </Col> */}
                  {/* <Col xs={12} md={4} xl={4}>
                    {" "}
                    <div className="Formlabel">
                      Area Colony , Street , Sector , Village
                      <span className="error-message">⁕</span>{" "}
                    </div>
                  </Col>
                  <Col xs={12} md={6} xl={6}>
                    <input
                      type="text"
                      className="MyInput"
                      placeholder="Enter Area Colony , Street , Sector , Village"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                    />
                  </Col> */}
                  <Col xs={12} md={4} xl={4}>
                    {" "}
                    <div className="Formlabel">
                    Landmark e.g. near IT park
                      {/* <span className="error-message">⁕</span>{" "} */}
                    </div>
                  </Col>
                  <Col xs={12} md={6} xl={6}>
                    <input
                      type="text"
                      className="MyInput"
                      placeholder="Enter Landmark e.g. near IT park"
                      name="landMark"
                      value={formData.landMark}
                      onChange={handleInputChange}
                    />
                  </Col>
                  {/* <Col xs={12} md={4} xl={4}>
                    {" "}
                    <div className="Formlabel">
                    Address Type
                      <span className="error-message">⁕</span>{" "}
                    </div>
                  </Col>
                  <Col xs={12} md={6} xl={6}>
                  <select
                  name="addressType"
                  className="MyInput"
                  value={formData.addressType}
                  onChange={handleInputChange}
                >
                  <option value="empty">Select Address Type</option>
                  <option value="male">Home</option>
                  <option value="female">Office</option>

                </select>
                  </Col> */}
                  <Col xs={12} md={4} xl={4}>
                    {" "}
                    <div className="Formlabel">
                    Address Details
                      <span className="error-message">⁕</span>{" "}
                    </div>
                  </Col>
                  <Col xs={12} md={6} xl={6}>
                  <textarea
                  style={{height:"auto"}}
                      type="textarea"
                      rows='4'
                      className="MyInput"
                      placeholder="Enter House No, Bulding ,Company ,Appartment ,Area Colony , Street , Sector , Village"
                      name="additionalAdd"
                      value={formData.additionalAdd}
                      onChange={handleInputChange}
                    />
                  </Col>

                  <Col xs={12} md={6} xl={6}></Col>
                  <Col xs={12} md={6} xl={6}>
                    {" "}
                    <div style={{ float: "right", margin: "10px" }}>
                    <button className="NextBtn" onClick={handlePrevious}>
                        Previous
                      </button>
                      <button className="NextBtn" onClick={handleNext2}>
                        Next
                      </button>
                    </div>
                  </Col>
                  </Row>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                  </Row>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
       <div className="modalDiv">
       <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Order Preview"
      >
        <div>
          {/* Customer details form */}
          <div style={{ width: '80%', margin: '20px auto' }}>

          </div>

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
                {/* <div className="p-counter">
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
                </div> */}
                <div className="p-price">
                  <span>{item.availablePackQty}</span> x{" "}
                  <span>{item.offerPrice} &#8377;</span>
                </div>
                {/* <div className="remove-btn">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveFromCart(item)}
                  >
                    Remove
                  </button>
                </div> */}
              </div>
            ))}
          </div>
          <div className="customerDetail">
          <div><span>Name</span><span>{formData.fullName}</span></div>
          <div><span>Contact Number</span><span>{formData.phoneNumber}</span></div>
          <div><span>Alternate Mobile Number</span><span>{formData.AlternateNumber}</span></div>
          <div><span>Landmark</span><span>{formData.landMark}</span></div>
          <div><span>Address Details</span><span>{formData.additionalAdd}</span></div>
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
{/* <button style={{width:"100%",marginBottom:"0.5rem"}} className="checkoutBtn" onClick={()=>navigate('/payment_step')}>Proceed To Checkout</button> */}

            </div>
          </div>
        </Col> 
      </Row>
    </div>

          <div style={{ textAlign: 'center', margin: '20px' }}>
            <button onClick={closeModal} className="NextBtn">Close</button>
            <button onClick={handleSubmit} className="NextBtn">Submit</button>
          </div>
        </div>
      </Modal>
       </div>

    </div>
  );
};

export default PaymentStep;
