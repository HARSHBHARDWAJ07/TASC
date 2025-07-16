import React from 'react';
import axios from "axios";
import './CSS/Signup.css';
import Illustation from '../Assets/ils.svg';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const API_URL = process.env.REACT_APP_API_URL;
  
const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); 
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    
   e.preventDefault();

    try {
        const response = await axios.post(`${API_URL}/signup`, {  email });

        if (response.status === 201) {
            alert('Signup successful. Please verify the OTP sent to your email.');
            setStep(2);
        }
    } catch (error) {
        console.error('Error during registration:', error);
        if (error.response) {
            alert(`Registration failed: ${error.response.data.message}`);
        } else if (error.request) {
            alert('Registration failed: No response from server.');
        } else {
            alert(`Registration failed: ${error.message}`);
        }
    }
};



const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(`${API_URL}/verify-otp`, { email, otp,password, username });

        if (response.status === 200) {
            alert('Email verified successfully!');
            navigate('/game');
        } else {
            alert('OTP verification failed. Please try again.');
        }
    } catch (error) {
        console.error('Error during OTP verification:', error);
        if (error.response) {
            alert(`Verification failed: ${error.response.data.message}`);
        } else if (error.request) {
            alert('Verification failed: No response from server.');
        } else {
            alert(`Verification failed: ${error.message}`);
        }
    }
};
 

  return (
    <div className='signin-container'>
      <div className="form-container">

      {step === 1 ? (

        <form
         onSubmit={handleSignUp}
        >
          <h3 className='main-text'>Get Started</h3>
          <div className="frame8"></div>
          <div className='frame9'>
            <hr />
            <p className='or'>Or</p>
            <hr />
          </div>
          <div className="frame4">
            <div className="inputbox">
              <input type="text" placeholder='Enter your Email...' 
              onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="inputbox">
              <input type="text" placeholder='Enter your Username...' 
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="inputbox">
              <input type="password" placeholder='Enter Your Password...' 
               onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button className='button1'>Create account</button>
        </form>
      ):(
        <div className="otp-container">
        <h1>Verify Your Email</h1>
        <form onSubmit={handleVerifyOtp}>
          <div className="otp-input-container">
            <input
              type="text"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
            />
          </div>
          <button className="button1">Verify Account</button>
        </form>
        <p className="resend-otp">
          Didn't receive code? 
          <button type="button">Resend OTP</button>
        </p>
      </div>
      )}
        <div className="signin-nav">
          <p>Already have an account?</p>
          <Link to="/signin">Sign in</Link>
        </div>
      </div>
      <div className="illustration-container">
        <img src={Illustation} alt='Illustration' />
      </div>
    </div>
  );
};

export default Signup;
