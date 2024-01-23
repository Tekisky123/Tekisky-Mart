import { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Context = createContext();

const AppContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [ourProduct, setOurProduct] = useState([]);
  const [selectProductData, setSelectProductData] = useState(null);
  const [productSize, setProductSize] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);

  

const increment = () => {
  setQuantity(quantity + 1);
};

const decrement = () => {
  if (quantity > 1) {
    setQuantity(quantity - 1);
  }
};

useEffect(() => {
  let subTotal = 0;
  cartItems.forEach(item => {
    if (item && item.selectedSize ) {
      subTotal += item?.selectedSize?.offerPrice * item?.selectedSize?.quantity;
    }
  });
  setCartSubTotal(subTotal);

  let count = 0;

  cartItems.forEach(item => {
    if (item && item.selectedSize) {
      count += item.selectedSize;
    }
  });
  setCartCount(count);
}, [cartItems]);


  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
    
  }, []);
  
  
  const handleAddToCart = (product, quantity,currentItem) => {

    ourProduct.push(selectProductData._id)
   
    let items = [...cartItems];
    let index = items.findIndex(p => p.id === product._id);

    if (index !== -1) {
      if (Array.isArray(items[index].productDetails[currentItem].availablePackQty)) {
        items[index].productDetails[currentItem].availablePackQty += quantity;
      } else {
        items[index].productDetails[currentItem].availablePackQty = [quantity];
      }
    } else {
      if (Array.isArray(product.productDetails[currentItem].availablePackQty)) {
        product.productDetails[currentItem].availablePackQty = quantity;
      } else {
        product.productDetails[currentItem].availablePackQty = [quantity];
      }
      items = [...items, product];
    }

    localStorage.setItem('cartItems', JSON.stringify(items));

    toast.success(`${product?.productName} has been added to your cart`);
    setCartItems(items);
  };

  // console.log("cartItems",cartItems)


  const handleRemoveFromCart = (product) => {
  console.log("product", product);
  let items = [...cartItems];
  items = items.filter(p => p._id !== product._id);

  localStorage.setItem('cartItems', JSON.stringify(items)); // Store as a JSON string
  setCartItems(items);
};

const handleCartProductQuantity = (type, product) => {
  setCartItems((prevItems) => {
    return prevItems.map((item) => {
      if (item._id === product._id) {
        let productDetails = item.selectedSize;

        if (!productDetails) {
          // Handle the case where productDetails is undefined
          return item;
        }

        if (type === "inc") {
          // Ensure that productDetails.quantity exists and is a number
          if (typeof productDetails.quantity === "number") {
            productDetails.quantity += 1;
          } else {
            // If quantity is not a number, set it to 1
            productDetails.quantity = 1;
          }
        } else if (type === "dec" && productDetails.quantity > 1) {
          productDetails.quantity -= 1;
        }
      }

      return item;
    });
  });
};




  return (
    <Context.Provider
      value={{
        ourProduct,
        setOurProduct,
        quantity,
        setQuantity,
        productSize,
        setProductSize,
        selectProductData,
        setSelectProductData,
        toast,
        ToastContainer,
        products,
        setProducts,
        categories,
        setCategories,
        cartItems,
        setCartItems,
        cartCount,
        setCartCount,
        cartSubTotal,
        setCartSubTotal,
        handleAddToCart,
        handleRemoveFromCart,
        handleCartProductQuantity
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
