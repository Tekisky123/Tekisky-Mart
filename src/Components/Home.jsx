import React from "react";
import "../Assets/Styles/Style.scss";
import OurCarousel from "./Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div className="cx-Home">
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


      <div className="c-tesimonals">
      <h3>Tesimonals</h3>
      <div className="main-tesimonals">
        <Row>
          <Col xs={12} md={6} xl={3}>
            <div></div>
          </Col>
          <Col xs={12} md={6} xl={3}>
            <div></div>
          </Col>
        </Row>
      </div>
    </div>


      <div className="B-Saller">
        <h3>Best Sellers</h3>
        <div className="mainSaller">
          <Row>
            <Col xs={12} md={6} xl={3}>
              {" "}
              <div className="Saller">
                {" "}
                <div className="subSaller">
                  {" "}
                  <img
                    src="https://grocerkid.com/wp-content/uploads/2021/10/kimia-dates.jpg"
                    alt=""
                  />
                  <div className="BestSellerDetails">
                    <h6>Kimia Dates</h6>
                    <p>₹310.00</p>
                    <div className="buy-button">
                    <button>Add To Cart</button>
                    <button>Buy Now</button>
                    </div>
                    
                  </div>
                </div>
              </div>{" "}
            </Col>
            <Col xs={12} md={6} xl={3}>
              {" "}
              <div className="Saller">
                {" "}
                <div className="subSaller">
                  {" "}
                  <img
                    src="https://grocerkid.com/wp-content/uploads/2021/10/kimia-dates.jpg"
                    alt=""
                  />
                  <div className="BestSellerDetails">
                    <h6>Kimia Dates</h6>
                    <p>₹310.00</p>
                    <div className="buy-button">
                    <button>Add To Cart</button>
                    <button>Buy Now</button>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </Col>
            <Col xs={12} md={6} xl={3}>
              {" "}
              <div className="Saller">
                {" "}
                <div className="subSaller">
                  {" "}
                  <img
                    src="https://grocerkid.com/wp-content/uploads/2021/10/kimia-dates.jpg"
                    alt=""
                  />
                  <div className="BestSellerDetails">
                    <h6>Kimia Dates</h6>
                    <p>₹310.00</p>
                    <div className="buy-button">
                    <button>Add To Cart</button>
                    <button>Buy Now</button>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </Col>
            <Col xs={12} md={6} xl={3}>
              {" "}
              <div className="Saller">
                {" "}
                <div className="subSaller">
                  {" "}
                  <img
                    src="https://grocerkid.com/wp-content/uploads/2021/10/kimia-dates.jpg"
                    alt=""
                  />
                  <div className="BestSellerDetails">
                    <h6>Kimia Dates</h6>
                    <p>₹310.00</p>
                    <div className="buy-button">
                    <button>Add To Cart</button>
                    <button>Buy Now</button>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </Col>
            <Col xs={12} md={6} xl={3}>
              {" "}
              <div className="Saller">
                {" "}
                <div className="subSaller">
                  {" "}
                  <img
                    src="https://grocerkid.com/wp-content/uploads/2021/10/kimia-dates.jpg"
                    alt=""
                  />
                  <div className="BestSellerDetails">
                    <h6>Kimia Dates</h6>
                    <p>₹310.00</p>
                    <div className="buy-button">
                    <button>Add To Cart</button>
                    <button>Buy Now</button>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </Col>
            <Col xs={12} md={6} xl={3}>
              {" "}
              <div className="Saller">
                {" "}
                <div className="subSaller">
                  {" "}
                  <img
                    src="https://grocerkid.com/wp-content/uploads/2021/10/kimia-dates.jpg"
                    alt=""
                  />
                  <div className="BestSellerDetails">
                    <h6>Kimia Dates</h6>
                    <p>₹310.00</p>
                    <div className="buy-button">
                    <button>Add To Cart</button>
                    <button>Buy Now</button>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </Col>
            <Col xs={12} md={6} xl={3}>
              {" "}
              <div className="Saller">
                {" "}
                <div className="subSaller">
                  {" "}
                  <img
                    src="https://grocerkid.com/wp-content/uploads/2021/10/kimia-dates.jpg"
                    alt=""
                  />
                  <div className="BestSellerDetails">
                    <h6>Kimia Dates</h6>
                    <p>₹310.00</p>
                    <div className="buy-button">
                    <button>Add To Cart</button>
                    <button>Buy Now</button>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </Col>
            <Col xs={12} md={6} xl={3}>
              {" "}
              <div className="Saller">
                {" "}
                <div className="subSaller">
                  {" "}
                  <img
                    src="https://grocerkid.com/wp-content/uploads/2021/10/kimia-dates.jpg"
                    alt=""
                  />
                  <div className="BestSellerDetails">
                    <h6>Kimia Dates</h6>
                    <p>₹310.00</p>
                    <div className="buy-button">
                    <button>Add To Cart</button>
                    <button>Buy Now</button>
                    </div>git 
                  </div>
                </div>
              </div>{" "}
            </Col>

          </Row>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default Home;
