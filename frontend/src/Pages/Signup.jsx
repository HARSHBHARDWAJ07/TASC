import React, { useState } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // Step 1: Sign Up, Step 2: OTP Verification
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/signup', { username, email, password });

            if (response.status === 201) {
                alert('Signup successful. Please verify the OTP sent to your email.');
                setStep(2); // Move to OTP verification step
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
            const response = await axios.post('http://localhost:4000/verify-otp', { email, otp });

            if (response.status === 200) {
                alert('Email verified successfully!');
                navigate('/login');
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
        <div className='signup'>
            {step === 1 ? (
                <form onSubmit={handleSignUp}>
                    <h1>SIGN UP</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Username'
                            required
                        />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email'
                            required
                        />
                        <MdEmail className='icon' />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            required
                        />
                        <FaLock className='icon' />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            ) : (
                <form onSubmit={handleVerifyOtp}>
                    <h1>VERIFY OTP</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder='Enter OTP'
                            required
                        />
                    </div>
                    <button type="submit">Verify OTP</button>
                </form>
            )}
            <div className="register-link">
                <p>
                    Back to login? <a href='/login'> Login</a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;

