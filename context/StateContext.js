import react, { createContext, useContext, useState, useEffect } from "react";

import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice(
      (previousTotalPrice) => previousTotalPrice + product.price * quantity
    );
    setTotalQty((prevTotalQty) => prevTotalQty + quantity);
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to cart`);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);
    if (value === "inc") {
      newCartItems.splice(index, 0, {
        ...foundProduct,
        quantity: foundProduct.quantity + 1,
      });
      setCartItems(newCartItems);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQty((prevTotalQty) => prevTotalQty + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        newCartItems.splice(index, 0, {
          ...foundProduct,
          quantity: foundProduct.quantity - 1,
        });
        setCartItems(newCartItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQty((prevTotalQty) => prevTotalQty - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => (prevQty <= 1 ? 1 : prevQty - 1));
  };

  return (
    <Context.Provider
      value={{
        totalPrice,
        totalQty,
        qty,
        showCart,
        cartItems,
        setShowCart,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
