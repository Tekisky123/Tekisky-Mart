import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Products from "./Pages/Products";
import ContactUs from "./Pages/ContactUs";
import SingleProduct from "./Pages/SingleProduct";
import Home from "./Components/Home";
import AboutUs from "./Pages/AboutUs";
import Cart from "./Components/Cart";
import Footer from "./Components/Footer";
import ProductForm from "./Pages/ProductForm";
import PaymentStep from "./Pages/PaymentStep";

// app apps hello
function App() {
  
  return (
    <div className="App">
    <Header/>
    {/* <Carousel/> */}
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/contact-us" element={<ContactUs/>}/>
      <Route path="/about-us" element={<AboutUs/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/single-product/:id" element={<SingleProduct/>}/>
      <Route path="/product-form" element={<ProductForm/>}/>
      <Route path="/payment_step" element={<PaymentStep/>}/>

    </Routes>
    <Footer/>
    
    </div>
  );
}

export default App;
