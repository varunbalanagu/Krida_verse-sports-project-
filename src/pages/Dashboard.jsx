import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [teams, setTeams] = useState({});
  const [sidebarActive, setSidebarActive] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedInUser");
    if (!loggedIn) {
      alert("Please login to view your dashboard.");
      navigate("/login");
      return;
    }

    setUsername(loggedIn);

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.username === loggedIn);

    if (user && user.teams) {
      setTeams(user.teams);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="dashboard-page-container" style={{ display: 'flex', width: '100vw', minHeight: '100vh' }}>
      <div className={`left-menu ${sidebarActive ? 'active' : ''}`}>
        <img src="/user.png" alt="User Profile" />
        <Link to="/">Home</Link>
        <Link to="/registration">Registration</Link>
        <Link to="/live-score">Live Scores</Link>
        <Link to="/schedule">Schedule</Link>
        <Link to="/contact-us">Contact Us</Link>
        <button className="logout" onClick={handleLogout}>Logout</button>
      </div>

      <div className="right-content">
        <div className="hamburger-menu" onClick={() => setSidebarActive(!sidebarActive)}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="container" style={{ marginTop: '20px' }}>
          <div className="header">
            <h2>Dashboard</h2>
          </div>
          <div className="welcome" id="welcomeUser">
            Welcome, {username}!
          </div>
          <div className="content" id="dashboardContent">
            <h3>Your Registered Teams</h3>
            <div id="teamList">
              {Object.keys(teams).length > 0 ? (
                Object.entries(teams).map(([sport, players]) => (
                  <div key={sport} style={{ marginBottom: '15px', background: '#161b22', padding: '15px', borderRadius: '8px' }}>
                    <strong style={{ color: '#58a6ff', textTransform: 'uppercase' }}>{sport}</strong>
                    <ul style={{ marginTop: '8px', paddingLeft: '20px', color: '#cad2c5' }}>
                      {players.map((p, idx) => <li key={idx}>{p}</li>)}
                    </ul>
                  </div>
                ))
              ) : (
                <p style={{ color: '#e63946' }}>You haven't registered for any sports yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
