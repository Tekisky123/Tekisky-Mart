import { Route, Routes } from "react-router-dom";
import Carousel from "./Components/Carousel";
import Header from "./Components/Header";
import Products from "./Pages/Products";
import ContactUs from "./Pages/ContactUs";

// app apps hello
function App() {
  
  return (
    <div className="App">
    <Header/>
    {/* <Carousel/> */}
    <Routes>
      <Route path="/products" element={<Products/>}/>
      <Route path="/contact-us" element={<ContactUs/>}/>
    </Routes>
    
    </div>
  );
}

export default App;
