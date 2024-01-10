import React, { useState } from 'react';
import "../Assets/Styles/Style.scss";
import { Col, Row } from "react-bootstrap";


const PaymentStep = () => {

    const [status, setStatus] = useState(0);




    const renderProgressBar = () => {
        const steps = [
          "Mobile Number",
          "Customer Details",
          "Payment",

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

  return (
    <div>
      <div className="first-image-container">
        <h2 className="first-container-heading">
          Payment Step
        </h2>
      </div>
      <div> {renderProgressBar()}</div>
      <div>
        <form action="">
        {status === 0 ? (<>
        <div>
        <Row>
        <Col xs={12} md={6} xl={6}>Enter Your Mobile Number</Col>
        <Col xs={12} md={6} xl={6}></Col>
        <Col xs={12} md={6} xl={6}></Col>
        </Row> 
        </div>
        </>) : status === 1 ? (<>
            <div>
        <Row>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        </Row> 
        </div>
        </>):(<>
            <div>
        <Row>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        </Row> 
        </div>
        </>)}
        </form>
      </div>
    </div>
  );
}

export default PaymentStep;
