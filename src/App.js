import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../src/components/home';
import About from '../src/components/about';
import Program from '../src/components/services';
import Contact from '../src/components/contact';
import Membership from '../src/components/membership';
import Users from '../src/components/user';
import Login from '../src/components/login';
import Signup from '../src/components/singup';
import './styles/style.css';
import UserDashboard from '../src/components/UserDashboard';
import Workout from '../src/components/workout';
import Diet from '../src/components/diet';
import Details from '../src/components/details';
import MyAccount from '../src/components/myaccount';
import Checkout from '../src/components/checkout';
import StravaCallback from '../src/components/stravacallback';
import CaloriesBurnedGauge from '../src/components/caloriesburnedgauge';
import UpdateWeightLossGoal from '../src/components/updateweightlossgoal';
import WeightTracking from '../src/components/weightTracking';
import WeightGoalEstimate from '../src/components/weightgoalestimate';
import WeightLossChart from '../src/components/weightlosschart';


const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Program />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/user" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Signup />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/diet" element={<Diet />} />  
        <Route path="/details" element={<Details />} />  
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/checkout" element={<Checkout />} /> 
        <Route path="/strava/callback" element={<StravaCallback />} />
        <Route path="/caloriesburned" element={<CaloriesBurnedGauge />} />
        <Route path="/updategoals" element={<UpdateWeightLossGoal/>} />
        <Route path="/weighttracking" element={<WeightTracking/>} />
        <Route path="/weightestimate" element={<WeightGoalEstimate/>} />
        <Route path="/weightlosschart" element={<WeightLossChart/>} />

      </Routes>
    
  );
};

export default App;