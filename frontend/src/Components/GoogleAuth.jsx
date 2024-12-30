// src/components/GoogleAuth.jsx
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleAuth = () => {
    const navigate = useNavigate();

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const { credential } = credentialResponse;
            const response = await axios.post('http://localhost:4000/auth/google', { token: credential });

            if (response.status === 200) {
                alert('Google Login Successful');
                navigate('/profile'); // Redirect after successful login
            }
        } catch (error) {
            console.error('Google login error:', error);
            alert('Google Login Failed');
        }
    };

    const handleGoogleFailure = () => {
        alert('Google Login Failed. Please try again.');
    };

    return (
        <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
        />
    );
};

export default GoogleAuth;
