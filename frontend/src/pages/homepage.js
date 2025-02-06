import React from 'react';
import Signup from '../components/Signup';
import Login from '../components/Login';
import ForgotPassword from '../components/ForgotPassword';
import { UserContext } from '../App';
import { useContext } from 'react';
import logo from '../assets/images/logo.png';
import '../styles/style.css';



const Homepage = ({onLogin , onSignup}) => {
const user = useContext(UserContext);

  
  return (
    <div className='homepage'>
      <div className='logo'><img src={logo} alt="logo" /></div> 
      <div className='title'>
        <h1>Welcome to Job-Jar!</h1>
      </div>     
      <div className='login-signup'>
        {!user?.email && <Signup onSignup = {onSignup}/>}
        <div className='login-forgot'>
          {!user?.email && <Login onLogin = {onLogin}/>}
          {!user?.email && <ForgotPassword/>}
        </div>
      </div>
    </div>
  );
};

export default Homepage;