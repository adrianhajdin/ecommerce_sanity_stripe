import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const onAdd = (product, quantity) => {
      let checkProduct = cartItems.find((cartProduct) => cartProduct._id === product._id);
      setTotalPrice(totalPrice + product.price * quantity);
      
      if(checkProduct) {
          let updatedProduct = {...checkProduct,
              quantity: checkProduct.quantity + quantity};
          let index = cartItems.indexOf(checkProduct);
          if(~index){
              cartItems[index] = updatedProduct
          }
          setCartItems(cartItems)
      } else {
          setCartItems([ ...cartItems, { ...product, quantity: quantity }]);
          setTotalQuantities(totalQuantities + 1);
      }

      setQty(1);
      toast.success(`${qty} ${product.name} added to the cart`);
  } 

  const onRemove = (product) => {
      let foundProduct = cartItems.find((item) => item._id === product._id);
      let filteredList = cartItems.filter((products) => products._id !== product._id);
      setCartItems(filteredList);
      setTotalPrice(totalPrice - foundProduct.price * foundProduct.quantity);
      setTotalQuantities(totalQuantities - 1)
  }

  const toggleCartItemQuanitity = (id, value) => {
      let foundProduct = cartItems.find((item) => item._id === id);

      if (value === 'inc'){
        let updatedProduct = {...foundProduct, 
            quantity: foundProduct.quantity + 1};
        let index = cartItems.indexOf(foundProduct);
        if(~index){
            cartItems[index] = updatedProduct
        }
        setCartItems(cartItems);
        setTotalPrice(totalPrice + foundProduct.price);
      } else if (value === 'dec'){
          if (foundProduct.quantity > 1) {
            let updatedProduct = {...foundProduct, 
                quantity: foundProduct.quantity - 1};
            let index = cartItems.indexOf(foundProduct);
            if(~index){
                cartItems[index] = updatedProduct
            }
            setCartItems(cartItems);
            setTotalPrice(totalPrice - foundProduct.price);
        }
      }
  };

  const incQty = () => {
      setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
      setQty((prevQty) => {
        if(prevQty - 1 < 1) return 1;
      
        return prevQty - 1;
      });
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities 
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);

