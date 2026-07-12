import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('adminLoggedIn', 'true');
      alert("Admin Login Successful!");
      navigate('/admin/dashboard');
    } else {
      alert("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="admin-login-body">
      <div className="glass-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
