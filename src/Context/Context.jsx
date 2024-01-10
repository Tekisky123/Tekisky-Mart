import { createContext, useEffect, useState } from "react";

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
        item => (subTotal += item.mrp * item.availablePackQty[0])
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
      items[index].availablePackQty[0] += quantity;
    } else {
      product.availablePackQty[0] = quantity;
      items = [...items, product];
    }

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
