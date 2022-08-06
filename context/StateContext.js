import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

//hooks
const Context = createContext();

//in our context we'll have a lot of states
//including local storage so the user's data can be saved
export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  //product we'd want to update
  let foundProduct;
  let index;

  //add to cart function: 1- check if product already in the cart?
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    //update states
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      //update carts if the item already exists in the cart
      //cartProduct to 'item'
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
      });
      setCartItems(updatedCartItems);
    }
    //if item doesn't exist in the cart
    else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to cart.`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);

    const newCartItems = cartItems.filter((item) => item._id !== id);

    //+ incrementing or - decrementing
    //UPDATE CART ITEM BY CREATING NEW VARIABLE TO UPDATE THE STATE
    //update price , quantities
    if (value === "inc") {
      // Here we update the newCartItems array with the new product quantity at the correct index before updating the state with the new array
      foundProduct = { ...foundProduct, quantity: foundProduct.quantity + 1 };

      newCartItems.splice(index, 0, foundProduct);

      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
      setCartItems(newCartItems);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        
       setCartItems(
         cartItems.map((item, i) =>
           i === index
             ? { ...foundProduct, quantity: foundProduct.quantity - 1 }
             : item
         )
       );
       setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
       setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  //update quantity using a previous state and callback function
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

//create a new function to export all props and data more easily
export const useStateContex = () => useContext(Context);
