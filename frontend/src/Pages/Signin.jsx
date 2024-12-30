import React, {useState} from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import GoogleAuth from '../Components/GoogleAuth'; 


const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const accessReq = async (e) => {
    e.preventDefault();

    try{
      const datas = await axios.post('http://localhost:4000/login' ,{email , password},{
        withCredentials:true,  
    });
      
      if (datas.status === 200) {
        alert('success');
        localStorage.setItem('user', JSON.stringify(datas.data.user));
       navigate('/profile');
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
    <div className="background">
  <div className="loginsignup">
    <form onSubmit={accessReq}>
    <h1>LOGIN</h1>
    <div className="input-box">
      <input type="text" 
       value={email}
       onChange={(e) => setEmail(e.target.value)}
      placeholder='email' required />
      <MdEmail className='icon' />
    </div>
    <div className="input-box">
    <input type="text"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder='password' required />
    <FaLock className='icon' />
      </div>
      <div className="google-login">
       <GoogleAuth /> {/* Reusable GoogleAuth Component */}
      </div>
    <button type="submit">
      Login
    </button>
    <div className="register-link">
      <p>
        if you don't have an account ? <a href='./register'> register</a>
      </p>
    </div>
    </form>
  </div>
  </div>
  );
};

export default Signin;