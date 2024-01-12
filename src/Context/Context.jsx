import { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

export const Context = createContext();

const AppContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
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
    if (item && item.productDetails && item.productDetails[0]) {
      subTotal += item.productDetails[0].offerPrice * item.productDetails[0].availablePackQty;
    }
  });
  setCartSubTotal(subTotal);

  let count = 0;
  cartItems.forEach(item => {
    if (item && item.productDetails && item.productDetails[0]) {
      count += item.productDetails[0].availablePackQty;
    }
  });
  setCartCount(count);
}, [cartItems]);


  useEffect(() => {
    // Load cart items from cookies on component mount
    const storedCartItems = Cookies.get('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  
  const handleAddToCart = (product, quantity) => {
   
    let items = [...cartItems];
    let index = items.findIndex(p => p.id === product._id);

    if (index !== -1) {
      if (Array.isArray(items[index].productDetails[0].availablePackQty)) {
        items[index].productDetails[0].availablePackQty += quantity;
      } else {
        items[index].productDetails[0].availablePackQty = [quantity];
      }
    } else {
      if (Array.isArray(product.productDetails[0].availablePackQty)) {
        product.productDetails[0].availablePackQty = quantity;
      } else {
        product.productDetails[0].availablePackQty = [quantity];
      }
      items = [...items, product];
    }

    // Save cart items to cookies
    Cookies.set('cartItems', JSON.stringify(items), { expires: Infinity });

    toast.success(`${product?.productName} has been added to your cart`);
    setCartItems(items);
  };

  console.log("cartItems",cartItems)


  const handleRemoveFromCart = (product) => {
  console.log("product", product);
  let items = [...cartItems];
  items = items.filter(p => p._id !== product._id);

  setCartItems(items);
  localStorage.setItem("cartItems", JSON.stringify(items)); // Store as a JSON string
};


  const handleCartProductQuantity = (type, product) => {
    let items = [...cartItems];
    let index = items.findIndex(p => p.id === product._id);

    if (type === "inc") {
      items[index].productDetails[0].availablePackQty += 1;
    } else if (type === "dec") {
      if (items[index].productDetails[0].availablePackQty === 1) return;
      items[index].productDetails[0].availablePackQty -= 1;
    }
    setCartItems(items);
  };

  return (
    <Context.Provider
      value={{
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
