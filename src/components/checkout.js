import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access passed state
import '../styles/checkout.css';
import FitGlideLogoWhite from '../assets/FitGlide-logo-white.png';

const Checkout = () => {
  const location = useLocation(); // Access the passed state
  const plan = location.state?.plan; // Get the plan details from state

  return (
    <div className="checkout-page">
      {/* Header Section */}
      <header>
        <nav>
          <div className="nav__logo">
            <a href="logo">
              <img src={FitGlideLogoWhite} alt="logo" />
            </a>
          </div>
        </nav>
        <h3>CHECKOUT</h3>
      </header>

      <main>
        <section className="checkout-form">
          <form action="#!" method="get">
            <h6>Contact information</h6>

            {/* First Name Field */}
            <div className="form-control">
              <label htmlFor="checkout-first-name">First Name</label>
              <div>
                <span className="fa fa-user"></span>
                <input
                  type="text"
                  id="checkout-first-name"
                  name="checkout-first-name"
                  placeholder="Enter your first name..."
                />
              </div>
            </div>

            {/* Last Name Field */}
            <div className="form-control">
              <label htmlFor="checkout-last-name">Last Name</label>
              <div>
                <span className="fa fa-user"></span>
                <input
                  type="text"
                  id="checkout-last-name"
                  name="checkout-last-name"
                  placeholder="Enter your last name..."
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label htmlFor="checkout-email">E-mail</label>
              <div>
                <span className="fa fa-envelope"></span>
                <input
                  type="email"
                  id="checkout-email"
                  name="checkout-email"
                  placeholder="Enter your email..."
                />
              </div>
            </div>

            {/* Mobile Field */}
            <div className="form-control">
              <label htmlFor="checkout-mobile">Mobile</label>
              <div>
                <span className="fa fa-phone"></span>
                <input
                  type="tel"
                  name="checkout-mobile"
                  id="checkout-mobile"
                  placeholder="Enter your mobile..."
                />
              </div>
            </div>


          </form>
        </section>

        {/* Checkout Details Section */}
        <section className="checkout-details">
          <div className="checkout-details-inner">
            {plan ? (
              <div className="card">
                <div className="card-details">
                  <div className="card-name">{plan.description}</div> {/* Dynamically display plan description */}
                  <div className="card-price">₹{plan.amount}</div> {/* Dynamically display plan amount */}
                  <div className="card-price">Validity {plan.duration} Months</div> {/* Dynamically display plan duration */}
                </div>
              </div>
            ) : (
              <p>No plan selected.</p>
            )}

            {/* Coupons Section */}
            <div className="checkout-coupons">
              <h6>Coupons</h6>
              <input type="text" placeholder="Enter coupon code..." />
              <button type="button">Apply</button>
            </div>

            <div className="checkout-total">
              <h6>Total</h6>
              <p>₹{plan ? plan.amount : '0'}</p> {/* Dynamically display total amount */}
            </div>

            {/* Checkout Button */}
            <div className="form-control-btn" style={{ marginTop: 'auto' }}>
              <button type="submit" style={{ width: '100%' }}>Checkout</button> {/* Change label to "Checkout" */}
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="section__container footer__container">
        <span className="bg__blur"></span>
        <span className="bg__blur footer__blur"></span>
        <div className="footer__col">
          <div className="footer__logo">
            <img src={FitGlideLogoWhite} alt="logo" />
          </div>
          <p>
            Take the first step towards a healthier, stronger you with our
            unbeatable pricing plans. Let's sweat, achieve, and conquer together!
          </p>
          <div className="footer__socials">
            <a href="https://www.facebook.com/profile.php?id=61553604106849">
              <i className="ri-facebook-fill"></i>
            </a>
            <a href="https://instagram.com/fitglidenoida82">
              <i className="ri-instagram-line"></i>
            </a>
            <a href="https://twitter.com/fit_glide">
              <i className="ri-twitter-fill"></i>
            </a>
            <a href="https://www.youtube.com/channel/UCNj_ftKqGZfVa3GLizEJYfA">
              <i className="ri-youtube-fill"></i>
            </a>
          </div>
        </div>
        <div className="footer__col">
          <h4>Discover</h4>
          <a href="link-button">About Us</a>
          <a href="link-button">Meet The Team</a>
          <a href="link-button">Our Vision</a>
        </div>
        <div className="footer__col">
          <h4>Connect</h4>
          <a href="link-button">Blogs</a>
          <a href="link-button">Contact Us</a>
          <a href="link-button">Careers</a>
        </div>
        <div className="footer__col">
          <h4>Support</h4>
          <a href="link-button">Community</a>
          <a href="link-button">Privacy Policy</a>
          <a href="link-button">Terms & Conditions</a>
        </div>
      </footer>
      <div className="footer__bar">
        Copyright © 2024 FitGlide. All rights reserved.
      </div>
    </div>
  );
};

export default Checkout;