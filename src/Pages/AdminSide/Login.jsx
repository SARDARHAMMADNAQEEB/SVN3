// Login.jsx

import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; // Import your CSS file for styling
import {  useAuth } from './AuthContext';
import AuthContext from './AuthContext';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signIn, setAuthenticated, setIsAdmin } = useAuth();
 
  const handleLogin = async () => {
    try {
      if (!email || !password) {
        toast.error('Please enter both email and password.');
        return;
      }

      const response = await fetch('http://localhost:8000/api/account/signin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        // Assuming the response contains a token upon successful login
        const data = await response.json();
  localStorage.setItem('token', data.access_token);
  localStorage.setItem('email', email); 
        // Redirect to the dashboard or any other authenticated page
        // const isAdminUser = true;
        setAuthenticated(true);
        setIsAdmin(true);
        navigate('/dashboard');
      } else {
        setAuthenticated(false);
        setIsAdmin(false);
        // Handle authentication failure, show error message, etc.
        toast.error('Invalid email or password. Please try again.');
      }
    } 
      catch (error) {
        console.error('Error during login:', error);
        toast.error(`An error occurred during login: ${error.message}`);
    }
  };

  const handleKeyDown = (e) => {
    // Check if the Enter key is pressed
    if (e.key === 'Enter') {
      // Simulate a click on the login button
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login Administration</h2>
        <form>
          <label>
            <br />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='input-login'
              placeholder='Email'
              onKeyDown={handleKeyDown}
              
            />
          </label>
          <br />
          <label>
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='input-login'
              placeholder='Password'
              onKeyDown={handleKeyDown}
            />
          </label>
          <br />
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
