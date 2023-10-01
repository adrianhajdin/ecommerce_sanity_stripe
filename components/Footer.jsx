import React from 'react';
import { AiFillInstagram, AiOutlineTwitter, AiFillFacebook} from 'react-icons/ai';

const Footer = () => {
  return (
    <footer id="footer" className="footer">
 
    <div className="container">
        <div className="row gy-3">
        <div className="col-lg-3 col-md-6 d-flex">
         <i className="bi bi-geo-alt icon"></i>
         <div>
           <h4>Address</h4>
           <p>
              Bortianor off WestHills mall - GH<br></br>
           </p>
         </div>
    </div>

<div className="col-lg-3 col-md-6 footer-links d-flex">
  <i className="bi bi-telephone icon"></i>
  <div>
    <h4>Order</h4>
    <p>
      <strong>Phone:</strong> +233 243 270 774<br></br>
      <strong>Email:</strong> makufoodsgh@gmail.com<br></br>
    </p>
  </div>
</div>

<div className="col-lg-3 col-md-6 footer-links d-flex">
  <i className="bi bi-clock icon"></i>
  <div>
    <h4>Opening Hours</h4>
     <p>
      <strong>Mon-Sat: 08AM</strong> - 20PM <br></br>
      Sunday: Closed
     </p>
  </div>
</div>

<div className="col-lg-3 col-md-6 footer-links">
  <h4>Follow Us</h4>
  <div className="social-links d-flex">
    <AiFillInstagram />
    <AiOutlineTwitter />
    <AiFillFacebook />
  </div>
</div>

</div>
</div>

<div className="footer-container">    
  <p>2023 &copy;Makufoods All rights reserverd</p>
  <p className="icons">
    <AiFillInstagram />
    <AiOutlineTwitter />
    <AiFillFacebook />
  </p>
</div>
</footer>
  )
}

export default Footer
