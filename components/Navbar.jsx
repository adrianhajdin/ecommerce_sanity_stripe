import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './';
import { useStateContext} from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const [cartQuantity, setCartQuantity] = useState(0); // To avoid React hydration error

  useEffect(() => setCartQuantity(totalQuantities), [totalQuantities]);

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">JSM Headphones</Link>
      </p>

      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{cartQuantity}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar