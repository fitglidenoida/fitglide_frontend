import React from 'react';
import { Link } from 'react-router-dom';
import '../../src/styles/about.css';
import FitGlideLogoWhite from '../assets/FitGlide-logo-white.png';
import 'remixicon/fonts/remixicon.css'; // Import Remixicon CSS

const AboutUs = () => {
  return (
    <div>
      <nav>
        <div className="nav__logo">
          <Link to="/"><img src={FitGlideLogoWhite} alt="logo" /></Link>
        </div>
        <ul className="nav__links">
          <li className="link"><Link to="/">Home</Link></li>
          <li className="link"><Link to="/services">Program</Link></li>
          <li className="link"><Link to="/membership">Membership</Link></li>
          <li className="link"><Link to="/about">About</Link></li>
          
        </ul>
        <Link to="/whyus">
          <button className="btn">Join Now</button>
        </Link>
      </nav>

      <header className="section__container header__container">
        <div className="header__content">
          <span className="bg__blur"></span>
          <span className="bg__blur header__blur"></span>
          <h4>WELCOME TO FITGLIDE</h4>
          <h1><span>EXPLORE</span> FITGLIDE</h1>
        </div>
      </header>

      <section className="section__container welcome__container">
        <h2 className="section__header">Welcome to FitGlide</h2>
        <p>
          At FitGlide, we are dedicated to revolutionizing the way you approach fitness and wellness.
          Founded with a mission to empower individuals to achieve their health goals, FitGlide combines
          cutting-edge technology with personalized fitness plans. Our goal is to make fitness accessible,
          enjoyable, and effective for everyone, whether you're just starting your journey or looking to
          refine your routine.
        </p>
      </section>
      

      <section className="section__container story__container">
        <div className="our_story">
          <h2>Our Story</h2>
          <p>
            Founded in 2022, FitGlide started with a simple yet powerful vision: to transform lives through
            tailored fitness solutions. Over the years, we’ve grown from a small startup into a leading fitness
            platform, thanks to our commitment to innovation and excellence. Our mission is to provide personalized,
            science-backed fitness and wellness programs that cater to each individual’s unique needs, helping them
            achieve their goals and live healthier, happier lives.
          </p>
          <h2>Our Mission</h2>
          <p>
            Our mission is to make fitness an integral and enjoyable part of life for everyone. We believe in the power
            of personalized fitness and aim to deliver top-quality programs that inspire and motivate. By leveraging
            the latest technology and expert insights, we strive to create a supportive community where every member
            can thrive.
          </p>
          <div className="story__button">
            <Link to="/whyus"><button className="btn">Why Choose Us</button></Link>
          </div>
        </div>
      </section>

      <section className="section__container values__container">
        <h2 className="section__header">Our Core Values</h2>
        <div className="values__grid">
          <div className="value__card">
            <h4>Innovation</h4>
            <p>
              We are dedicated to bringing the latest advancements in fitness and wellness to our clients, ensuring
              they have access to cutting-edge tools and technologies that enhance their health journey.
            </p>
          </div>
          <div className="value__card">
            <h4>Personalization</h4>
            <p>
              Our fitness programs are tailored to meet the unique needs and goals of each individual, providing
              customized plans that maximize results and promote long-term success.
            </p>
          </div>
          <div className="value__card">
            <h4>Community</h4>
            <p>
              We build a strong, supportive community where members inspire and motivate one another, creating a positive
              and inclusive environment for everyone.
            </p>
          </div>
          <div className="value__card">
            <h4>Excellence</h4>
            <p>
              We are committed to delivering exceptional quality in all aspects of our services, from our expertly designed
              programs to our outstanding customer support, ensuring an unparalleled experience for our clients.
            </p>
          </div>
          <div className="value__card">
            <h4>Integrity</h4>
            <p>
              We conduct our business with honesty and transparency, fostering trust and reliability with our clients through
              ethical practices and genuine care for their well-being.
            </p>
          </div>
          <div className="value__card">
            <h4>Empowerment</h4>
            <p>
              We empower individuals to take control of their health and fitness journey by providing the knowledge, resources,
              and support they need to achieve their goals and lead healthier, happier lives.
            </p>
          </div>
        </div>
      </section>

      <footer className="section__container footer__container">
        <span className="bg__blur"></span>
        <span className="bg__blur footer__blur"></span>
        <div className="footer__col">
          <div className="footer__logo">
            <img src={FitGlideLogoWhite} alt="logo" />
          </div>
          <p>
            Take the first step towards a healthier, stronger you with our unbeatable pricing plans. Let's sweat,
            achieve, and conquer together!
          </p>
          <div className="footer__socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="ri-facebook-fill"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="ri-instagram-line"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="ri-twitter-fill"></i></a>
          </div>
        </div>
        <div className="footer__col">
          <h4>Discover</h4>
          <Link to="/about">About Us</Link>
          <Link to="/team">Meet The Team</Link>
          <Link to="/vision">Our Vision</Link>
        </div>
        <div className="footer__col">
          <h4>Connect</h4>
          <Link to="/blogs">Blogs</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/careers">Careers</Link>
        </div>
        <div className="footer__col">
          <h4>Support</h4>
          <Link to="/community">Community</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>
      </footer>
      <div className="footer__bar">
        Copyright © 2024 FitGlide. All rights reserved.
      </div>
    </div>
  );
};

export default AboutUs;