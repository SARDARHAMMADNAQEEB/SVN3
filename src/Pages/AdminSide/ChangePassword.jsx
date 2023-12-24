// ChangePassword.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; // Import your CSS file for styling

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  const handleChangePassword = async () => {
    try {
      if (!oldPassword || !newPassword || !confirmPassword) {
        toast.error('Please fill in all fields.');
        return;
      }

      if (newPassword !== confirmPassword) {
        toast.error('New password and confirm password do not match.');
        return;
      }

      const response = await fetch('http://localhost:8000/api/account/change/password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
        }),
      });

      if (response.ok) {
        toast.success('Password changed successfully!');
        navigate('/login'); // You can redirect to a different page after password change
      } else {
        const data = await response.json();
        toast.error(data.new_password || 'Failed to change password. Please try again.');
      }
    } catch (error) {
      console.error('Error during password change:', error);
      toast.error('An error occurred during password change. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Change Password</h2>
        <form>
            
          <label>
            
            <br />
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className='input-login'
              placeholder='Old Password'
            />
          </label>
          <br />
          <label>
         
            <br />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='input-login'
              placeholder='New Password'
            />
          </label>
          <br />
          <label>
         
            <br />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='input-login'
              placeholder='Confirm Password'
            />
          </label>
          <br />
          <button type="button" onClick={handleChangePassword} style={{width:'70%'}}>
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
