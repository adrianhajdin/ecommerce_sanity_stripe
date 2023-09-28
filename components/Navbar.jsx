import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './';
import { useStateContext} from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div id="header" className="navbar-container">
      <p className="logo d-flex align-items-center me-auto me-lg-0">
        <Link href="/" className="logo">Makufoods</Link>
      </p>

      <nav id="navbar" className="navbar">
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/categories">Categories</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/gallery">Gallery</Link></li>      
          <li><Link href="/events">Events</Link></li>
          <li><Link href="/chefs">Team</Link></li>
          <li><Link href="/contact">Contact</Link></li>

          <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
            <AiOutlineShopping />
            <span className="cart-item-qty">{totalQuantities}</span>
          </button>
          <li><Link className="login" href="/login">login</Link></li>
        </ul>

         {showCart && <Cart />}
      </nav>
     
    </div>
  )
}

export default Navbar
