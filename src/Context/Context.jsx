import { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export const Context = createContext();

const AppContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubToatal] = useState(0);
  const [quantity, setQuantity] = useState(1);

const increment = () => {
  setQuantity(quantity + 1);
};

const decrement = () => {
  if (quantity > 1) {
    setQuantity(quantity - 1);
  }
};

  useEffect(
    () => {
      let subTotal = 0;
      cartItems.map(
        item => (subTotal += item.offerPrice * item.availablePackQty[0])
      );
      setCartSubToatal(subTotal);

      let count = 0;
      cartItems.map(item => (count += item.availablePackQty[0]));
      setCartCount(count);
    },
    [cartItems]
  );

  const handleAddToCart = (product, quantity) => {
  let items = [...cartItems];
  let index = items.findIndex(p => p.id === product.id);

  if (index !== -1) {
    // Check if availablePackQty is an array before accessing its first element
    if (Array.isArray(items[index].availablePackQty)) {
      items[index].availablePackQty[0] += quantity;
    } else {
      // If not an array, create an array and set the first element
      items[index].availablePackQty = [quantity];
    }
  } else {
    // Check if availablePackQty is an array before accessing its first element
    if (Array.isArray(product.availablePackQty)) {
      product.availablePackQty[0] = quantity;
    } else {
      // If not an array, create an array and set the first element
      product.availablePackQty = [quantity];
    }
    items = [...items, product];
  }
  toast.success(`${product.productName} has been added to your cart`);
  setCartItems(items);
};

  console.log("cartItems",cartItems)


  const handleRemoveFromCart = product => {
    let items = [...cartItems];
    items = items.filter(p => p.id !== product.id);

    setCartItems(items);
    localStorage.setItem("cartItems", items);
  };

  const handleCartProductQuantity = (type, product) => {
    let items = [...cartItems];
    let index = items.findIndex(p => p.id === product.id);

    if (type === "inc") {
      items[index].availablePackQty[0] += 1;
    } else if (type === "dec") {
      if (items[index].availablePackQty[0] === 1) return;
      items[index].availablePackQty[0] -= 1;
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
        setCartSubToatal,
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
