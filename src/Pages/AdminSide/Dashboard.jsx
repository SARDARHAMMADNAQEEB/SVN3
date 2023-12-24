// Dashboard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  // Mock data for the logged-in user
  const loggedInUser = {
    email: localStorage.getItem('email') || 'admin@example.com', // Retrieve email from localStorage or use a default value
  };

  const handleLogout = () => {
    // Implement your logout logic here, e.g., clearing tokens, state, etc.
    // Then navigate to the login page
    localStorage.removeItem('email'); // Clear the saved email from localStorage
    navigate('/login');
  };

  const handleChangePassword = () => {
    // Implement navigation to the change password page
    navigate('/change-password');
  };
  const handleNavigate = (page) => {
    // Generic function to navigate to different pages
    navigate(`/${page}`);
  };

  return (
    <div className='dashboard-main'>
      <header className="dashboard-header">
        <div className="user-info">
          <span>Welcome, {loggedInUser.email}</span>
        </div>
        <div className="header-buttons">
          <button onClick={handleChangePassword}>Change Password</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <div className="dashboard-content">
        {/* Add your dashboard content here */}
        <h2>Dashboard</h2>
        <div className="side-panel">
          <h3>Accounts</h3>
          <ul>
            <li onClick={() => handleNavigate('contact-admin')} className='even'>Contact Us</li>
            <li onClick={() => handleNavigate('offices-admin')} className='odd'>Offices</li>
            <li onClick={() => handleNavigate('people-admin')} className='even'>Brokers</li>
            <li onClick={() => handleNavigate('propertyType-admin')} className='odd'>Property Types</li>
            <li onClick={() => handleNavigate('properties-admin')} className='even'>Properties</li>
            <li onClick={() => handleNavigate('salesType-admin')} className='odd'>Sale Types</li>
            <li onClick={() => handleNavigate('sign-up-admin')} className='even'>Sign Up</li>
            {/* <li onClick={() => handleNavigate('users-admin')} className='odd'>Users</li> */}
            {/* Add more links as needed */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
