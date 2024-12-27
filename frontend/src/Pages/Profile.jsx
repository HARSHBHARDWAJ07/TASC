import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {      try {
        const response = await axios.get('http://localhost:4000/profile', {
          withCredentials: true,
        });

        if (response.data.status === 'ok') {
          setUser(response.data.user);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          
        } else {
          localStorage.removeItem('user'); 
          alert('Not authenticated');
          navigate('/login'); 
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        localStorage.removeItem('user'); 
        alert('An error occurred while fetching the profile.');
        navigate('/login'); 
      }
    };

    fetchProfile();
  }, [navigate]);

  

  return (
    <div className='profile'>
      <h1>Profile Page</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.username}!</h2>
         
        </div>
      ) : (
        <p>Loading...</p>
      )}
     
    </div>
  );
};

export default Profile;