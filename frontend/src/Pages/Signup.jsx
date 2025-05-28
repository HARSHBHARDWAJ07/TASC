import React, { useState, useEffect } from 'react';
import axios from "axios";
import './CSS/Signup.css';
import Illustation from '../Assets/ils.svg';
import { Link, useNavigate } from "react-router-dom";

// Add detailed API URL logging
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
console.log("Using API URL:", API_URL);

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

  // Log environment details for debugging
  useEffect(() => {
    console.log("Environment Variables:", process.env);
    console.log("Current Environment:", process.env.NODE_ENV);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    
    // Enhanced validation
    if (!formData.email || !formData.username || !formData.password) {
      setError('All fields are required');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    console.log("Sending signup request to:", `${API_URL}/signup`);
    console.log("Request data:", formData);
    
    try {
      const response = await axios.post(
        `${API_URL}/signup`, 
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 10000  // 10 second timeout
        }
      );
      
      console.log("Signup response:", response);
      
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
    if (!otp || otp.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }

    setLoading(true);
    console.log("Sending OTP verification to:", `${API_URL}/verify-otp`);
    console.log("Verification data:", { ...formData, otp });
    
    try {
      const response = await axios.post(
        `${API_URL}/verify-otp`, 
        { ...formData, otp },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );
      
      console.log("OTP verification response:", response);
      
      if (response.status === 200) {
        alert('Account verified successfully!');
        navigate('/signin');
      }
    } catch (error) {
      handleApiError(error, 'Verification');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    console.log("Resending OTP to:", formData.email);
    
    try {
      const response = await axios.post(
        `${API_URL}/resend-otp`, 
        { email: formData.email },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );
      
      console.log("Resend OTP response:", response);
      
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
    
    // Detailed error logging
    let message = 'An unexpected error occurred';
    
    if (error.response) {
      // Server responded with error status (4xx, 5xx)
      console.error('Error response data:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
      
      message = error.response.data?.message || 
               error.response.statusText || 
               `Server responded with status ${error.response.status}`;
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
      message = 'No response from server. Check your network connection.';
    } else {
      // Other errors
      console.error('Request setup error:', error.message);
      message = error.message;
    }
    
    // CORS specific check
    if (message.includes('Network Error') || message.includes('Failed to fetch')) {
      message += '. Possible CORS issue. Check backend configuration.';
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
                  autoComplete="email"
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
                  autoComplete="username"
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
                  autoComplete="new-password"
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
                  autoComplete="one-time-code"
                  inputMode="numeric"
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
