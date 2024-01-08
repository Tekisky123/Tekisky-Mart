import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Products from "./Pages/Products";
import ContactUs from "./Pages/ContactUs";
import SingleProduct from "./Pages/SingleProduct";
import Home from "./Components/Home";

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
      <Route path="/single-product" element={<SingleProduct/>}/>

    </Routes>
    
    </div>
  );
}

export default App;
