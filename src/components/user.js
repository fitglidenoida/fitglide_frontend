import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import '../styles/user.css'; // assuming you save the CSS in User.css

//login api
import { login,register } from '../axios/auth';

const User = () => {
  const [signIn, setSignIn] = useState(true); // Default to the sign-in form
  const [formData, setFormData] = useState({
    email: '',
    mobile: null,
    password: '',
    confirmPassword: '',
    username: ''
  });

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const toggleForm = () => {
    setSignIn(!signIn);
  };

  useEffect(()=>{
    const jwt = localStorage.getItem("jwt");
    if(jwt != null && jwt != undefined){
      navigate('/dashboard');
    }

  },[])

  const handleInputChange = (e) => {
    if(e.target.name == "mobile"){
      setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
    }else{
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    
  };

  const handleSignup = async () => {
    const { email, mobile, password, username } = formData;

    
    try {
      const response = await fetch('http://localhost:1337/api/auth/local/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username:email,
          email,
          password,
          mobile
        })
      });
      const data = await response.json();
      if (response.ok) {
        console.log('User registered successfully:', data);
        setFormData({
          email: '',
          mobile: '',
          password: '',
          confirmPassword: '',
          username: ''
        });
        // Redirect to UserDashboard after successful signup
        localStorage.setItem('jwt', data.jwt);
      localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard'); // Updated navigation
      } else {
        console.error('Error during signup:', data.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const handleLogin = async () => {
    const { username, password } = formData;

    login({
      identifier: username, // Strapi uses 'identifier' for login (could be email or username)
      password
    }).then(data => {
      console.log('User logged in successfully:', data);
      setFormData({
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        username: ''
      });
      // Store JWT token for future API requests
      localStorage.setItem('jwt', data.jwt);
      localStorage.setItem('user', JSON.stringify(data.user));
      // Redirect to UserDashboard after successful login
      navigate('/dashboard'); // Updated navigation
    }).catch(e => {
      console.error('Error during login:', e.message);
    });
  };

  return (
    <div id="container" className={`container ${signIn ? 'sign-in' : 'sign-up'}`}>
      <div className="row">
        {/* SIGN UP */}
        <div className="col align-items-center flex-col sign-up">
          <div className="form-wrapper align-items-center">
            <div className="form sign-up">
              <div className="input-group">
                <i className="bx bx-mail-send"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <i className="bx bx-phone"></i>
                <input
                  type="number"
                  name="mobile"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
              <button onClick={handleSignup}>Sign up</button>
              <p>
                <span>Already have an account?</span>
                <b onClick={toggleForm} className="pointer">Sign in here</b>
              </p>
            </div>
          </div>
        </div>
        {/* SIGN IN */}
        <div className="col align-items-center flex-col sign-in">
          <div className="form-wrapper align-items-center">
            <div className="form sign-in">
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <button onClick={handleLogin}>Sign in</button>
              <p><b>Forgot password?</b></p>
              <p>
                <span>Don't have an account?</span>
                <b onClick={toggleForm} className="pointer">Sign up here</b>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* CONTENT SECTION */}
      <div className="row content-row">
        {/* SIGN IN CONTENT */}
        <div className="col align-items-center flex-col">
          <div className="text sign-in">
            <h2>Welcome</h2>
          </div>
          <div className="img sign-in"></div>
        </div>
        <div className="col align-items-center flex-col">
          <div className="img sign-up"></div>
          <div className="text sign-up">
            <h2>Road to Fitness</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;