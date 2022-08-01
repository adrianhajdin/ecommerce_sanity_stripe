import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) =>
    {
        // see if product is already in the cart
        const productInCart = cartItems.find((item) => item._id === product._id);
        // this needs to happen regardless if item is already in cart
        setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quantity);
        // if product is already in cart -> add new quantity to previous quantity
        if (productInCart)
        {
            const updatedCartItems = cartItems.map((item) =>
            {
                // find the matching product and adjust the number in the cart
                if (item._id === product._id)
                {
                    return { ...item, quantity: item.quantity + quantity };
                }
            });
            setCartItems(updatedCartItems);
        }
        else
        {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }]);
        }
        toast.success(`${qty} ${product.name} added to the cart.`);
        // so each product defaults to 1 when navigating to a new product
        setQty(1);
    }

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuantity = (id, value) =>
  {
      foundProduct = cartItems.find((item) => item._id === id);
      index = cartItems.findIndex((product) => product._id === id);

      if (value === 'inc')
      {
          foundProduct.quantity += 1;
          setTotalPrice(prevTotalPrice => prevTotalPrice + foundProduct.price);
          setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1);
      } else if (value === 'dec')
      {
          if (foundProduct.quantity > 1)
          {
              foundProduct.quantity -= 1;
              setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price);
              setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);
          }
      }
      let newCartItems = cartItems.map((item, i) =>
      {
          return i === index ? foundProduct : item;
      });
      setCartItems(newCartItems);
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
