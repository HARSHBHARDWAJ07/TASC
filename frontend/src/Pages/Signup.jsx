import React, { useState } from 'react';
import axios from "axios";
import './CSS/Signup.css';
import Illustation from '../Assets/ils.svg';
import { Link, useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.email || !formData.username || !formData.password) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/signup`, formData);
      if (response.status === 201) {
        alert('OTP sent to your email. Please verify.');
        setStep(2);
      }
    } catch (error) {
      handleApiError(error, 'Registration');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setError('Please enter OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/verify-otp`, 
        { ...formData, otp }
      );
      
      if (response.status === 200) {
        alert('Account verified successfully!');
        navigate('/signin');  // Fixed navigation
      }
    } catch (error) {
      handleApiError(error, 'Verification');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/resend-otp`, 
        { email: formData.email }
      );
      
      if (response.status === 200) {
        alert('New OTP sent to your email');
      }
    } catch (error) {
      handleApiError(error, 'Resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleApiError = (error, context) => {
    console.error(`${context} error:`, error);
    let message = 'An unexpected error occurred';
    
    if (error.response) {
      message = error.response.data.message || error.response.statusText;
    } else if (error.request) {
      message = 'No response from server';
    } else {
      message = error.message;
    }
    
    setError(`${context} failed: ${message}`);
    alert(`${context} failed: ${message}`);
  };

  return (
    <div className='signin-container'>
      <div className="form-container">
        {step === 1 ? (
          <form onSubmit={handleSignUp}>
            <h3 className='main-text'>Get Started</h3>
            {error && <div className="error-message">{error}</div>}
            
            <div className="frame8"></div>
            <div className='frame9'>
              <hr />
              <p className='or'>Or</p>
              <hr />
            </div>
            
            <div className="frame4">
              <div className="inputbox">
                <input 
                  type="email"
                  name="email"
                  placeholder='Enter your Email...'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="inputbox">
                <input 
                  type="text"
                  name="username"
                  placeholder='Enter your Username...'
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="inputbox">
                <input 
                  type="password"
                  name="password"
                  placeholder='Enter Your Password...'
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
              </div>
            </div>
            
            <button 
              className='button1' 
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Create account'}
            </button>
          </form>
        ) : (
          <div className="otp-container">
            <h1>Verify Your Email</h1>
            <form onSubmit={handleVerifyOtp}>
              {error && <div className="error-message">{error}</div>}
              
              <div className="otp-input-container">
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  pattern="\d{6}"
                  required
                />
              </div>
              
              <button 
                className="button1" 
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify Account'}
              </button>
            </form>
            
            <p className="resend-otp">
              Didn't receive code?
              <button 
                type="button"
                onClick={handleResendOtp}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Resend OTP'}
              </button>
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
