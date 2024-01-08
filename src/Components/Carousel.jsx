import React, { useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import "../Assets/Styles/Carousel.css"


const OurCarousel = () => {



  return (
   <div>
        <Carousel>
      <Carousel.Item interval={2000}>

        <img className='CarouselImg' src="https://olympusestate.com/wp-content/uploads/2020/11/1002.jpg" alt="" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>

        <img className='CarouselImg' src="https://assets.lybrate.com/imgs/tic/enadp/raw-dates.webp" alt="" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>

        <img className='CarouselImg' src="https://coachellasbestdates.com/cdn/shop/articles/Copy_of_Untitled_7_1200x1200.png?v=1628014137" alt="" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
   </div>
  )
}

export default OurCarousel