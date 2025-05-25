import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
       <h1>TASC</h1>
      <button className="nav-btn" onClick={() => navigate('/game')}>
        Game
      </button>
      <button className="nav-btn" onClick={() => navigate('/')}>
        Home
      </button>
      <button className="nav-btn" onClick={() => navigate('/signin')}>
        Sign in
      </button>
    </nav>
  );
}

export default Navbar;
