import React from 'react'
import '../../Assets/Styles/AboutUs.css'
// import logo from "../../Assets/Images/main-logo.png"
// import arsh from '../../Assets/Images/arsh.jpeg'
import ajwa from '../../Assets/Images/ajwa.jpeg'
import flipkart from "../../Assets/Images/flipkart_logo.png"
import amazon from "../../Assets/Images/amazon-png-logo.png"
import logo from "../../Assets/Images/teki-mart-logo.jpg"


const AboutUs = () => {
  return (
    <>
      <div className='main-Aboutus'>
        <div className='aboutus'>
          <h2 id='main-head'>About us</h2>
        </div>
        <div className='home'>Home &gt; About us</div>

      </div>

      {/* image and data div */}
      <div className='vid-data'>
        <div className='Data-img'>
          <img src={logo} alt="" className='logo-img' />
          <div className='data'>Sarah International is one of the leading importers of Dates in India. Established in 1988 by Mr. Gulam Ahmed Godil, it continues to be a family owned and professionally run business. The head office is based in Vashi,New Mumbai. Starting with the import of dates it has grown with time and today it leads the import market in Mumbai, India. We have come a long way and today we import all kinds of dates from Saudi Arabia, Iran,UAE, Jordan, Tunisia, Algeria, Oman etc. Realizing the importance of evolution and the changing industry state, we in 2017,are launching our own Brand of premium quality dates under the name of “ARSH”. Our product range is processed with the highest standards of hygiene and state of the art technology. We have 30 years of experience in the dates industry and thus have extensive experience in providing dates to our esteemed customers. We believe in establishing a long lasting relationship with our customers through our sincerity and commitment in business.</div>
        </div>

        {/* div for video */}
        <div className='video'>
          <img src={ajwa} alt="" height='35%' width='75%' id='video' />
        </div>

      </div>

      {/* reviewe slider */}

      

      {/* slider for  available at */}
      <div className='available-main'>
        <h2>Available at</h2>
        <div className='Available-slider'>
          <img src={flipkart} alt="" className='available-img' />
          <img src={amazon} alt="" className='available-img' />
          <img src={flipkart} alt="" className='available-img' />
          <img src={amazon} alt="" className='available-img'  />

        </div>
      </div>


      <div className='enquiry-main'>
        <div className='shipping'>
          <p>Free shipping</p>
        </div>
        <div className='cod'>
          <p>cod available</p>
        </div>
        <div className='Enquiry'>
          <p>bulk Enquiry</p>
          <p>contact :</p>
        </div>
      </div>

      {/* last para div */}
      <div className='Last-para'>
        <p style={{ fontSize: "20px" }}>Bulk products</p>
        <h2>Are you looking for dates in large quantity?</h2>
        <button className='cnt-btn'>Contact us &rarr;</button>
      </div>
    </>
  )
}

export default AboutUs
