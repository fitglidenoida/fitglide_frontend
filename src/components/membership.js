import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../../src/styles/membership.css';
import FitGlideLogoWhite from '../assets/FitGlide-logo-white.png';
import WhyUs from '../assets/whyus.png';
import 'remixicon/fonts/remixicon.css';
import NavLink from './navlinks';
import { Plans } from '../axios/auth'; // Import the Plans function

function Membership() {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate
  
    useEffect(() => {
      const fetchPlans = async () => {
        try {
          const response = await Plans(); // Fetch plans
          console.log("Fetched plans response:", response); // Log the full response to inspect
          setPlans(response.data); // Set state with the fetched plans
        } catch (error) {
          console.error("Error fetching plans:", error);
        }
      };
    
      fetchPlans();
    }, []);

  // Function to handle the "Join Now" button click
  const handleJoinNow = (plan) => {
    navigate('/checkout', { state: { plan } }); // Redirect to checkout with the selected plan details
  };

  return (
    <>
      <nav>
        <div className="nav__logo">
          <Link to="#"><img src={FitGlideLogoWhite} alt="logo" /></Link>
        </div>
        <NavLink />
        <Link to="/about">
          <button className="btn">Join Now</button>
        </Link>
      </nav>

      <header className="section__container header__container">
        <div className="header__content">
          <span className="bg__blur"></span>
          <span className="bg__blur header__blur"></span>
          <h4>EXPLORE OUR PLANS AND PRICING</h4>
          <h1><span>FITNESS</span> MADE EASY </h1>
        </div>
      </header>

      <section className="section__container price__container">
  <div className="price__grid">
    {plans.map((plan) => (
      <div className="price__card" key={plan.id}>
        <div className="price__card__content">
          <h4>{plan.description}</h4> {/* Mapped to description */}
          <h3>₹{plan.amount}</h3> {/* Mapped to amount */}
          <p><strong>Validity:</strong> {plan.duration} months</p> {/* Mapped to duration */}

          {/* Log the entire features object */}
          {console.log("Plan features:", plan.features)}

          {/* Ensure the plan has features and plans before accessing them */}
          {plan.features && plan.features.plans && plan.features.plans.length > 0 ? (
            <>
              {/* Log the specific plan we're accessing */}
              {console.log("Accessing plan:", plan.features.plans[0])}

              {/* Access the first plan and map through its features */}
              {plan.features.plans[0].features && plan.features.plans[0].features.map((feature, index) => (
                <p key={index}>
                  <i className="ri-checkbox-circle-line"></i>
                  {feature.feature} {feature.included ? "" : "(Not included)"}
                </p>
              ))}

              {/* Render notes below the features */}
              {plan.features.plans[0].features && plan.features.plans[0].features.map((feature, index) => 
                feature.note ? <p key={`note-${index}`}><strong>*</strong> {feature.note}</p> : null
              )}
            </>
          ) : (
            <p>No features available.</p> // Fallback message
          )}
        </div>
        <button className="btn price__btn" onClick={() => handleJoinNow(plan)}> {/* Pass the selected plan */}
          Join Now
        </button>
      </div>
    ))}
  </div>
</section>

      <section className="section__container join__container">
        <h2 className="section__header">WHY JOIN US?</h2>
        <p className="section__subheader">
          Join FitGlide to embark on a transformative fitness journey tailored for complete wellness.
          With our expert programs and personalized support, achieve your ideal body and unlock your full potential.
        </p>
        <div className="join__image">
          <img src={WhyUs} alt="Join" />
          <div className="join__grid">
            <div className="join__card">
              <span><i className="ri-user-star-fill"></i></span>
              <div className="join__card__content">
                <h4>Expert Mentors</h4>
                <p>Unlock your potential with our expert mentors.</p>
              </div>
            </div>
            <div className="join__card">
              <span><i className="ri-vidicon-fill"></i></span>
              <div className="join__card__content">
                <h4>Personalized Training</h4>
                <p>Elevate your fitness with Personalized Training</p>
              </div>
            </div>
            <div className="join__card">
              <span><i className="ri-building-line"></i></span>
              <div className="join__card__content">
                <h4>Community Support</h4>
                <p>Supportive Community, for your fitness success.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="section__container footer__container">
        <span className="bg__blur"></span>
        <span className="bg__blur footer__blur"></span>
        <div className="footer__col">
          <div className="footer__logo"><img src={FitGlideLogoWhite} alt="logo" /></div>
          <p>
            Take the first step towards a healthier, stronger you with our
            unbeatable pricing plans. Let's sweat, achieve, and conquer together!
          </p>
          <div className="footer__socials">
            <Link to="#"><i className="ri-facebook-fill"></i></Link>
            <Link to="#"><i className="ri-instagram-line"></i></Link>
            <Link to="#"><i className="ri-twitter-fill"></i></Link>
          </div>
        </div>
        <div className="footer__col">
          <h4>Discover</h4>
          <Link to="#">About Us</Link>
          <Link to="#">Meet The Team</Link>
          <Link to="#">Our Vision</Link>
        </div>
        <div className="footer__col">
          <h4>Connect</h4>
          <Link to="#">Blogs</Link>
          <Link to="#">Contact Us</Link>
          <Link to="#">Careers</Link>
        </div>
        <div className="footer__col">
          <h4>Support</h4>
          <Link to="#">Community</Link>
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Terms & Conditions</Link>
        </div>
      </footer>
      <div className="footer__bar">
        Copyright © 2024 FitGlide. All rights reserved.
      </div>
    </>
  );
}

export default Membership;