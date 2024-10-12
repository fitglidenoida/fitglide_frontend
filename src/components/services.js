import React, { useState } from 'react';
import '../styles/service.css'; // Make sure to include your CSS file here
import FitGlideLogoWhite from '../assets/FitGlide-logo-white.png';
import NavLink from './navlinks';

const Service = () => {
    const [activeTab, setActiveTab] = useState('strength');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const serviceData = {
        strength: {
            description: [
                "Core Exercises: Focused on the abdominal muscles, lower back, and hips to improve stability and support the spine.",
                "Resistance Training: Utilizing weights, resistance bands, and bodyweight exercises to enhance muscle strength and tone.",
                "Functional Movements: Incorporating activities that mimic everyday tasks to improve overall functional fitness and mobility.",
                "Flexibility and Stretching: Ensuring muscles remain flexible and reducing the risk of injury through targeted stretching routines.",
                "Recovery and Rest: Emphasizing the importance of rest days and proper recovery techniques to allow muscles to repair and grow."
            ],
            benefits: [
                "Improved Muscle Strength: Enhances the ability to perform daily activities with ease and reduces the risk of muscle-related injuries.",
                "Increased Metabolism: Strength training boosts metabolism, helping with weight management and fat loss.",
                "Better Posture: Strengthening core muscles can lead to improved posture and reduced back pain.",
                "Enhanced Athletic Performance: Improves overall athletic capabilities, making other physical activities more efficient and less tiring.",
                "Boosted Mental Health: Regular exercise, including strength training, has been shown to reduce symptoms of anxiety and depression, and improve overall mood."
            ]
        },
        cardio: {
          description: [
            "Outdoor Sports: Activities such as running, cycling, swimming, and hiking that provide a fun and effective way to get your heart pumping.",
            "Interval Training: High-intensity interval training (HIIT) sessions that alternate between intense bursts of activity and periods of rest to maximise cardiovascular benefits.",
            "Endurance Exercises: Steady-state cardio exercises like jogging, brisk walking, and rowing to build stamina and improve heart function.",
            "Cross-Training: Incorporating different types of cardio exercises to prevent boredom and ensure a well-rounded cardiovascular workout.",
            "Heart Rate Monitoring: Using wearable technology to track heart rate and ensure participants are training in their optimal heart rate zones for maximum benefit."
          ],

          benefits: [
            "Enhanced Heart Health: Regular cardio exercise strengthens the heart, improves circulation, and lowers the risk of cardiovascular diseases.",
            "Increased Stamina and Endurance: Builds the body's ability to sustain prolonged physical activity, making daily tasks easier and more enjoyable.",    
            "Weight Management: Cardio workouts are effective for burning calories and aiding in weight loss or maintenance.",
            "Mental Health Boost: Engaging in regular physical activity has been shown to reduce stress, anxiety, and depression, while improving overall mood.",   
            "Social Interaction: Participating in outdoor sports and group activities fosters a sense of community and social support."
          ]
      },
      weight: {
        description: [
          "Exercise: A personalized set of physical activities designed to suit your fitness level and preferences. This includes cardio workouts, strength training, flexibility exercises, and more.",
          "Nutrition: Customized dietary plans developed by our nutrition experts to ensure you receive the right balance of nutrients to support your weight management goals.",
          "Discipline: Building and maintaining healthy habits through consistent routines, motivation, and support to help you stay on track and achieve lasting results."
        ],
        benefits: [
          "Personalized Approach: Tailored plans that address your specific health markers and individual needs, ensuring effective and sustainable weight management.",
          "Comprehensive Fitness: A balanced mix of cardio, strength, and flexibility exercises to promote overall fitness and well-being.",    
          "Nutritional Guidance: Expert advice on healthy eating habits and meal plans that support weight loss and maintenance.",
          "Behavioral Support: Strategies to build discipline and consistency, helping you overcome challenges and stay committed to your goals.",   
          "Improved Health: Achieving a healthy weight can reduce the risk of chronic diseases, improve energy levels, and enhance overall quality of life."
        ]
    },
      diabetes: {
        description: [
          "Exercise: A personalized set of physical activities designed to help manage blood sugar levels, improve insulin sensitivity, and promote overall fitness. This includes cardio workouts, strength training, and flexibility exercises.",
          "Nutrition: Customized dietary plans developed by our nutrition experts to ensure you receive the right balance of nutrients to manage diabetes effectively.",
          "Discipline: Building and maintaining healthy habits through consistent routines, motivation, and support to help you stay on track and achieve lasting results."
            ],
            benefits: [
              "Personalized Approach: Tailored plans that address your specific health markers and individual needs, ensuring effective and sustainable diabetes management.",
              "Blood Sugar Control: A balanced mix of exercise and nutrition to help regulate blood sugar levels and reduce the risk of diabetes-related complications..",    
              "Nutritional Guidance: Expert advice on healthy eating habits and meal plans that support blood sugar management.",
              "Behavioral Support: Strategies to build discipline and consistency, helping you overcome challenges and stay committed to your goals.",   
              "Improved Health: Achieving a healthy weight can reduce the risk of chronic diseases, improve energy levels, and enhance overall quality of life."
            ]
        },
    };

    return (
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
                    <h4>CHOOSE YOUR PROGRAM</h4>
                    <h1><span>Programs</span></h1>
                </div>
            </header>

            <section className="section__container program__container">
                <div className="program__tabs">
                    <button
                        className={`tab-button ${activeTab === 'strength' ? 'active' : ''}`}
                        onClick={() => handleTabClick('strength')}
                    >
                        Strength Training
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'cardio' ? 'active' : ''}`}
                        onClick={() => handleTabClick('cardio')}
                    >
                        Cardio Training
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'weight' ? 'active' : ''}`}
                        onClick={() => handleTabClick('weight')}
                    >
                        Weight Management
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'diabetes' ? 'active' : ''}`}
                        onClick={() => handleTabClick('diabetes')}
                    >
                        Diabetes Management
                    </button>
                </div>

                <div className="program__content">
                    <div id="strength" className={`tab-content ${activeTab === 'strength' ? 'active' : ''}`}>
                        <div className="program__description">
                            <h3>Key Components</h3>
                            {serviceData.strength.description.map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
                        </div>
                        <div className="program__image">
                            <h3>Benefits</h3>
                            {serviceData.strength.benefits.map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
                        </div>
                    </div>
                    <div id="cardio" className={`tab-content ${activeTab === 'cardio' ? 'active' : ''}`}>
                        <div className="program__description">
                            <h3>Key Components</h3>
                            {serviceData.cardio.description.map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
                        </div>
                        <div className="program__image">
                            <h3>Benefits</h3>
                            {serviceData.cardio.benefits.map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
                        </div>
                    </div>
                    <div id="weight" className={`tab-content ${activeTab === 'weight' ? 'active' : ''}`}>
                        <div className="program__description">
                            <h3>Key Components</h3>
                            {serviceData.weight.description.map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
                        </div>
                        <div className="program__image">
                            <h3>Benefits</h3>
                            {serviceData.weight.benefits.map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
                        </div>
                    </div>
                    <div id="diabetes" className={`tab-content ${activeTab === 'diabetes' ? 'active' : ''}`}>
                        <div className="program__description">
                            <h3>Key Components</h3>
                            {serviceData.diabetes.description.map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
                        </div>
                        <div className="program__image">
                            <h3>Benefits</h3>
                            {serviceData.diabetes.benefits.map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
                        </div>
                    </div>
                    {/* Add similar content for 'cardio', 'weight', 'diabetes' */}
                </div>
                <div className="getting_started">
                    <h3>Getting Started</h3>
                    <p>Join FitGlide to build a stronger, healthier you. Whether you're a novice or a seasoned athlete, our tailored exercises and expert guidance will help you achieve your fitness goals. Sign up today and take the first step towards a more powerful and resilient body!</p>
                </div>
                <div className="program__cta">
                    <a href="/membership">
                        <button className="btn">Join Now</button>
                    </a>
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
                        <a href="social-links"><i className="ri-facebook-fill"></i></a>
                        <a href="social-links"><i className="ri-instagram-line"></i></a>
                        <a href="social-links"><i className="ri-twitter-fill"></i></a>
                    </div>
                </div>
                <div className="footer__col">
                    <h4>Discover</h4>
                    <a href="link">About Us</a>
                    <a href="link">Meet The Team</a>
                    <a href="link">Our Vision</a>
                </div>
                <div className="footer__col">
                    <h4>Connect</h4>
                    <a href="link">Blogs</a>
                    <a href="link">Contact Us</a>
                    <a href="link">Careers</a>
                </div>
                <div className="footer__col">
                    <h4>Support</h4>
                    <a href="link">Community</a>
                    <a href="link">Privacy Policy</a>
                    <a href="link">Terms & Conditions</a>
                </div>
            </footer>
            <div className="footer__bar">
                Copyright © 2024 FitGlide. All rights reserved.
            </div>
        </div>
    );
};

export default Service;
