import React from 'react';
import '../../src/styles/privacypolicy.css'; // Add a CSS file for styling
import FitGlideLogoWhite from '../assets/FitGlide-logo-white.png';

const PrivacyPolicy = () => {
    return (
        <div>
            <nav>
                <div className="nav__logo">
                    <a href="/"><img src={FitGlideLogoWhite} alt="logo" /></a>
                </div>
                <a href="/membership">
                    <button className="btn">Join Now</button>
                </a>
            </nav>

            <header className="section__container header__container">
                <div className="header__content">
                    <span className="bg__blur"></span>
                    <span className="bg__blur header__blur"></span>
                    <h4>Privacy Policy</h4>
                </div>
            </header>

            <section className="section__container privacy__container">
                <div className="privacy__content">
                    <h1>Privacy Policy for Fitglide</h1>
                    <p>Effective Date: [Insert Date]</p>
                    <p>
                        Welcome to Fitglide (\"we,\" \"our,\" or \"us\"), owned and operated by Trailblaze Wellness. 
                        We are committed to protecting your privacy and ensuring a safe online experience when you 
                        use our website (fitglide.in) and mobile application (collectively, the \"Services\").
                    </p>
                    <h2>1. Information We Collect</h2>
<p>When you use our Services, we may collect the following types of information:</p>

<h3>1.1 Personal Information:</h3>
<ul>
  <li>Name</li>
  <li>Email address</li>
  <li>Phone number</li>
  <li>Date of birth</li>
  <li>Gender</li>
  <li>Payment information (for subscriptions or purchases)</li>
</ul>

<h3>1.2 Health and Fitness Information:</h3>
<ul>
  <li>Height, weight, and age</li>
  <li>Fitness goals</li>
  <li>Activity and exercise data</li>
  <li>Health metrics you voluntarily share (e.g., heart rate, steps, sleep patterns)</li>
</ul>

<h3>1.3 Device and Usage Information:</h3>
<ul>
  <li>IP address</li>
  <li>Browser type</li>
  <li>Device identifiers</li>
  <li>Usage patterns, such as time spent on the app and features accessed</li>
</ul>

<h3>1.4 Cookies and Tracking Technologies:</h3>
<p>We use cookies and similar technologies to enhance your user experience and gather analytics about your use of the Services.</p>

<h2>2. How We Use Your Information</h2>
<ul>
  <li>To provide and improve our Services</li>
  <li>To personalize your experience and recommend tailored fitness plans</li>
  <li>To process payments and manage subscriptions</li>
  <li>To send you updates, notifications, and promotional materials (with your consent)</li>
  <li>To ensure the security of our platform</li>
  <li>To comply with legal obligations</li>
</ul>

<h2>3. How We Share Your Information</h2>
<p>We may share your information in the following circumstances:</p>

<ul>
  <li><b>With Service Providers:</b> Trusted third parties who assist us in operating the Services, such as payment processors, analytics providers, and cloud storage services.</li>
  <li><b>For Legal Compliance:</b> When required to comply with applicable laws, regulations, or legal processes.</li>
  <li><b>With Your Consent:</b> When you provide explicit consent for us to share your data.</li>
  <li><b>Business Transfers:</b> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity.</li>
</ul>

<h2>4. Data Security</h2>
<p>We implement robust security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, so we cannot guarantee absolute security.</p>

<h2>5. Your Rights</h2>
<p>Depending on your location, you may have certain rights regarding your personal data, including:</p>

<ul>
  <li>Accessing your information</li>
  <li>Correcting inaccurate or incomplete data</li>
  <li>Requesting deletion of your data</li>
  <li>Restricting or objecting to certain data processing</li>
  <li>Data portability</li>
  <li>Withdrawing consent for processing</li>
</ul>

<p>To exercise your rights, please contact us at info@fitglide.in</p>

<h2>6. Third-Party Links</h2>
<p>Our Services may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites. We encourage you to review their privacy policies before providing any personal information.</p>

<h2>7. Children’s Privacy</h2>
<p>Fitglide is not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us immediately.</p>

<h2>8. International Users</h2>
<p>If you are accessing our Services from outside [Insert Country], note that your data may be transferred to, stored, and processed in a country different from your own. By using our Services, you consent to this transfer.</p>

<h2>9. Changes to This Privacy Policy</h2>
<p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date. We encourage you to review this policy periodically.</p>

<h2>10. Contact Us</h2>
<p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>

<ul>
  <li><b>Trailblaze Wellness</b></li>
  <li>Email: info@fitglide.in</li>
  <li>Phone: 9711882888</li>
  <li>Address: Gaur City 2, Greater Noida West</li>
</ul>

<p>By using Fitglide, you agree to this Privacy Policy. Thank you for trusting us with your health and fitness journey!</p>
                    {/* Continue adding sections from your privacy policy */}
                </div>
            </section>

            <footer className="section__container footer__container">
                <span className="bg__blur"></span>
                <span className="bg__blur footer__blur"></span>
                <div className="footer__col">
                    <div className="footer__logo"><img src={FitGlideLogoWhite} alt="logo" /></div>
                    <p>Take the first step towards a healthier, stronger you with our unbeatable pricing plans.</p>
                    <div className="footer__socials">
                        <a href="social-links"><i className="ri-facebook-fill"></i></a>
                        <a href="social-links"><i className="ri-instagram-line"></i></a>
                        <a href="social-links"><i className="ri-twitter-fill"></i></a>
                    </div>
                </div>
                <div className="footer__col">
                    <h4>Support</h4>
                    <a href="/">Community</a>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms">Terms & Conditions</a>
                </div>
            </footer>
            <div className="footer__bar">
                Copyright © 2024 FitGlide. All rights reserved.
            </div>
        </div>
    );
};

export default PrivacyPolicy;
