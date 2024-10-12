import React from 'react';
import '../../src/styles/home.css';
import FitGlideLogoWhite from '../assets/FitGlide-logo-white.png';
import HeroImage from '../assets/hero_image.png';
import Class1 from '../assets/class-1.jpg';
import Class2 from '../assets/community-rid.png';
import WhyUs from '../assets/whyus.png';
import member from '../assets/member.jpg';
import 'remixicon/fonts/remixicon.css';
import NavLink from './navlinks';

const Home = () => (
  <div>
    <nav>
      <div className="nav__logo">
        <a href="logo"><img src={FitGlideLogoWhite} alt="logo" /></a>
      </div>
      <NavLink />
      <a href="/membership">
        <button className="btn">Join Now</button>
      </a>
    </nav>

    <header className="section__container header__container">
      <div className="header__content">
        <span className="bg__blur"></span>
        <span className="bg__blur header__blur"></span>
        <h4>WANNA BE THE BIGGEST LOSER IN TOWN</h4>
        <h1><span>SHAPE UP</span> YOUR BODY</h1>
        <p>
          Unleash your potential and embark on a journey towards a stronger,
          fitter, and more confident you. Sign up to 'Shape Up Your Body'
          and witness the incredible transformation your body is capable of!
        </p>
        <a href="whyus.html">
          <button className="btn">Get Started</button>
        </a>
      </div>
      <div className="header__image">
        <img src={HeroImage} alt="header" />
      </div>
    </header>

      <section className="section__container explore__container">
        <div className="explore__header">
          <h2 className="section__header">EXPLORE OUR PROGRAM</h2>
          <div className="explore__nav">
            <span><i className="ri-arrow-left-line"></i></span>
            <span><i className="ri-arrow-right-line"></i></span>
          </div>
        </div>
        <div className="explore__grid">
          <div className="explore__card">
            <span><i className="ri-boxing-fill"></i></span>
            <h4>Strength</h4>
            <p>
              Embrace the essence of strength as we delve into its various
              dimensions physical, mental, and emotional.
            </p>
            <a href="/services">Join Now <i className="ri-arrow-right-line"></i></a>
          </div>
          <div className="explore__card">
            <span><i className="ri-heart-pulse-fill"></i></span>
            <h4>Cardio Wellness</h4>
            <p>
              It encompasses a range of activities that improve Cario Vascular health,
              flexibility, and overall well-being.
            </p>
            <a href="/services">Join Now <i className="ri-arrow-right-line"></i></a>
          </div>
          <div className="explore__card">
            <span><i className="ri-run-line"></i></span>
            <h4>Weight Loss</h4>
            <p>
              Through a combination of workout routines and expert guidance, we'll
              empower you to reach your goals.
            </p>
            <a href="/services">Join Now <i className="ri-arrow-right-line"></i></a>
          </div>
          <div className="explore__card">
            <span><i className="ri-shopping-basket-fill"></i></span>
            <h4>Diabetes Management</h4>
            <p>
              Designed for individuals, our program offers an effective approach
              to managing sugar effectively.
            </p>
            <a href="/services">Join Now <i className="ri-arrow-right-line"></i></a>
          </div>
        </div>
      </section>

      <section className="section__container class__container">
        <div className="class__image">
          <span className="bg__blur"></span>
          <img src={Class1} alt="activity" className="class__img-1" />
          <img src={Class2} alt="activity" className="class__img-2" />
        </div>
        <div className="class__content">
          <h2 className="section__header">READY FOR THE TRANSFORMATION?</h2>
          <p>
            Ready to transform your body and lifestyle? Join FitGlide and let the synergy of outdoor sports
            and personalized coaching guide you toward a healthier, more vibrant you. Embrace the freedom
            of movement, breathe in the fresh air, and embark on a fitness adventure that goes beyond the
            exercises. Each program is carefully curated to keep you engaged and
            challenged, ensuring you never hit a plateau in your fitness endeavors.
          </p>
          <a href="/membership">
            <button className="btn">Join Now</button>
          </a>
        </div>
      </section>

      <section className="section__container join__container">
        <h2 className="section__header">WHY JOIN US ?</h2>
        <p className="section__subheader">
          Join FitGlide to embark on a transformative fitness journey tailored for complete wellness
          With our expert programs and personalized support, achieve your ideal body and unlock your full potential
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

      <section className="section__container price__container">
        <h2 className="section__header">OUR PRICING PLAN</h2>
        <p className="section__subheader">
          Our pricing plan comes with various membership tiers, each tailored to
          cater to different preferences and fitness aspirations.
        </p>
        <div className="price__grid">
          <div className="price__card">
            <div className="price__card__content"> 
              <h4>Fitness Plan</h4>
              <h3>₹999</h3>
              <p>
                <i className="ri-checkbox-circle-line"></i>
                Plans start @ 999/Month
              </p>
              <p>
                <i className="ri-checkbox-circle-line"></i>
                Personalised Training Plan
              </p>
              <p>
                <i className="ri-checkbox-circle-line"></i>
                Personalised Nutrition Advise*
              </p>
              <p>
                <i className="ri-checkbox-circle-line"></i>
                Community Support
              </p>
              <p>
                * check the plans for inclusions
              </p>
            </div>
            <button className="btn price__btn">Join Now</button>
          </div>
          <div className="price__card">
            <div className="price__card__content">
              <h4>Weight Loss Plan</h4>
              <h3>₹9999</h3>
              <p>
                <i className="ri-checkbox-circle-line"></i>
                Pound Shedding Training Plans
              </p>
              <p>
                <i className="ri-checkbox-circle-line"></i>
                Weekly Diet plans
              </p>
              <p>
                <i className="ri-checkbox-circle-line"></i>
                Dedicated Fitness Buddy
              </p>
              <p>
                <i className="ri-checkbox-circle-line"></i>
                Validity 6 months
              </p>
            </div>
            <button className="btn price__btn">Join Now</button>
          </div>
          <div className="price__card">
            <div className="price__card__content">
              <h4>Diabetes Management Plan</h4>
              <h3>₹12999</h3>
              <p>
                <i className="ri-checkbox-circle-line"></i>
                Diabetes Focused training plans
              </p>
              <p>
                <i className="ri-checkbox-circle-line"></i>
                Weekly Nutrition consulting
              </p>
              <p>
                <i className="ri-checkbox-circle-line"></i>
                Dedicated Finess buddy
              </p>
              <p>
                <i className="ri-checkbox-circle-line"></i>
                Free Phisician Consulting*
              </p>
              <p>
                <i className="ri-checkbox-circle-line"></i>
                Validity 6 months
              </p>
              <p>
                *Twice in period of 6 months
              </p>
            </div>
            <button className="btn price__btn">Join Now</button>
          </div>
        </div>
      </section>

      <section className="review">
        <div className="section__container review__container">
          <span><i className="ri-double-quotes-r"></i></span>
          <div className="review__content">
            <h4>MEMBER REVIEW</h4>
            <p>
              What truly sets this gym apart is their expert team of trainers. The
              trainers are knowledgeable, approachable, and genuinely invested in
              helping members achieve their fitness goals. They take the time to
              understand individual needs and create personalized workout plans,
              ensuring maximum results and safety.
            </p>
            <div className="review__rating">
              <span><i className="ri-star-fill"></i></span>
              <span><i className="ri-star-fill"></i></span>
              <span><i className="ri-star-fill"></i></span>
              <span><i className="ri-star-fill"></i></span>
              <span><i className="ri-star-half-fill"></i></span>
            </div>
            <div className="review__footer">
              <div className="review__member">
                <img src={member} alt="member" />
                <div className="review__member__details">
                  <h4>Jane Cooper</h4>
                  <p>Software Developer</p>
                </div>
              </div>
              <div className="review__nav">
                <span><i className="ri-arrow-left-line"></i></span>
                <span><i className="ri-arrow-right-line"></i></span>
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
          <a href="https://www.facebook.com/profile.php?id=61553604106849"><i className="ri-facebook-fill"></i></a>
          <a href="https://instagram.com/fitglidenoida82"><i className="ri-instagram-line"></i></a>
          <a href="https://twitter.com/fit_glide"><i className="ri-twitter-fill"></i></a>
          <a href="https://www.youtube.com/channel/UCNj_ftKqGZfVa3GLizEJYfA"><i className="ri-youtube-fill"></i></a>
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

export default Home;
