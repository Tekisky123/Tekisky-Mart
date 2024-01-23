import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../Assets/Styles/Order.css";
import axios from "axios";
import { AllOrderAPI, Base_Url } from "../../apis/Apis";

const AllOrder = () => {
  const [loading, setLoading] = useState(true); // Track loading state
  const [orderData, setOrderdata] = useState([]);

  const getAllOrderData = async () => {
    try {
      const response = await axios.get(`${Base_Url}${AllOrderAPI}`);
      const data = response.data;
      if (data.success) {
        setOrderdata(data.orders);
        setLoading(false); // Set loading to false after successful data fetch
      } else {
        // Handle error if needed
        console.error("Error fetching data:", data.error);
        setLoading(false); // Set loading to false in case of an error
      }
    } catch (error) {
      // Handle network error
      console.error("Network error:", error);
      setLoading(false); // Set loading to false in case of a network error
    }
  };

  useEffect(() => {
    getAllOrderData();
  }, []);

  return (
    <div className="mainContainer">
      <Row style={{ marginLeft: "0px", marginRight: "0px" }}>
        {loading ? (
          // Render skeleton loading cards while data is being fetched
          Array.from({ length: 8 }).map((_, index) => (
            <Col key={index} xs={12} md={6} xl={3}>
              <div className="Saller product-card-skeleton" />
            </Col>
          ))
        ) : (
          <>
            {orderData?.map((order, index) => {
              return (
                <Col
                  xs={12}
                  md={6}
                  xl={3}
                  style={{ paddingLeft: "0px", paddingRight: "0px" }}
                >
                  <div className="card" key={index}>
                    <div className="card__content">
                      <h2 className="card__title">
                        Total <span className="card__titleSpan">{order.totalAmount}</span>
                      </h2>
                      <div className="card__details">
                      <h3 className="card__subTitle">{order.customerName}</h3>
                      <h3 className="card__subTitle">{order.mobileNumber}</h3>
                      </div>
                      
                      <div className="card__features">
                      {order?.productsDetails?.map((product,index)=>{
                       return(<p key={index} className="card__feature">{product?.productName}  {product?.quantity} x {product?.packetweight}</p>)
                      })}
                      </div>
                      <div>
                      <h5>address: asra nagar</h5>
                      <h5>landmark: nanded</h5>
                      

                      </div>
                      {/* <a href="#" className="card__link">
                        View Order
                      </a> */}
                    </div>
                  </div>
                </Col>
              );
            })}
          </>
        )}
      </Row>
    </div>
  );
};

export default AllOrder;
