import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('adminLoggedIn') !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard-container">
      <h1 className="title">Admin Dashboard</h1>
      
      <div className="card-container">
        <Link className="card" to="/admin/schedules">📅 Schedules</Link>
        <Link className="card" to="/admin/live-scores">🏏 Live Scores</Link>
        <Link className="card" to="/admin/notifications">🔔 Notifications</Link>
      </div>

      <button 
        onClick={handleLogout}
        style={{
          marginTop: '60px',
          padding: '12px 30px',
          background: '#d9534f',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Logout Admin
      </button>
    </div>
  );
}

export default AdminDashboard;
