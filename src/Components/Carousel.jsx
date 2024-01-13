import React, { useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import "../Assets/Styles/Carousel.css"
import banner1 from "../Assets/Images/banner1.jpg"
import banner2 from "../Assets/Images/banner2.jpg"
import banner3 from "../Assets/Images/banner3.jpg"


const OurCarousel = () => {



  return (
   <div>
        <Carousel>
      <Carousel.Item interval={2000}>

        <img className='CarouselImg' src={banner1} alt="" />
        <Carousel.Caption>
          {/* <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>

        <img className='CarouselImg' src={banner2} alt="" />
        <Carousel.Caption>
          {/* <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>

        <img className='CarouselImg' src={banner3} alt="" />
        <Carousel.Caption>
          {/* <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
   </div>
  )
}

export default OurCarousel