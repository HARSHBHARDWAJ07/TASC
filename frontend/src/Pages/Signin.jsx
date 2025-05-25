import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import './CSS/Signin.css';
import Illustation from '../Assets/ils.svg';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const accessReq = async (e) => {
    e.preventDefault();

    try{
      const datas = await axios.post(`${API_URL}/login` ,{email , password},{
        withCredentials:true,  
    });
      
      if (datas.status === 200) {
        alert('success');
        localStorage.setItem('user', JSON.stringify(datas.data.user));
       navigate('/game');
      } else {
       alert('login failed please try again');

      }
    } catch (error) {
     
      if(error.datas) {
        
        alert(`login failed: ${error.datas.data.message}`);
      } else if (error.request) {
         
          alert('login failed: No response from server.');
      } else {
          
          alert(`login failed: ${error.message}`);

      }
    }
  }

  return (
    <div className='signin-container'>
      <div className="form-container">
        <form
        onSubmit={accessReq}
        >
          <h3 className='main-text'>Welcome back !!</h3>
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
                id="password"
              />
            </div>
            <div className="inputbox">
              <input type="password" placeholder='Enter Your Password...' 
              onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="login_info">
            <input type="checkbox" id="rememberMe" name="rememberMe" />
            <label htmlFor="rememberMe" className="login">Save login info</label>
          </div>
          <button className='button1'>Login</button>
        </form>
        <div className="signin-nav">
          <p>Don't have an account?</p>
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
      <div className="illustration-container">
        <img src={Illustation} alt='Illustration' />
      </div>
    </div>
  );
};

export default Signin;