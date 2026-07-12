import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hamburgerActive, setHamburgerActive] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const profileRef = useRef(null);
  const bellRef = useRef(null);

  useEffect(() => {
    // Check if user is logged in
    setLoggedInUser(localStorage.getItem('loggedInUser'));

    // Listen to outside clicks to close dropdowns
    const handleOutsideClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setBellOpen(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  // Sync state when location changes (in case of login/logout redirects)
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
    setHamburgerActive(false);
    setProfileOpen(false);
    setBellOpen(false);
  }, [location]);

  const loadNotifications = () => {
    // Load both 'notification_data' and 'notification' for absolute compatibility
    const data1 = localStorage.getItem('notification_data');
    const data2 = localStorage.getItem('notification');
    let combined = [];
    try {
      if (data1) combined = JSON.parse(data1);
    } catch (e) {}
    try {
      if (data2) {
        const list = JSON.parse(data2);
        list.forEach(item => {
          if (!combined.some(c => c.content === item.content && c.heading === item.heading)) {
            combined.push(item);
          }
        });
      }
    } catch (e) {}
    setNotifications(combined);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    navigate('/login');
  };

  const toggleBell = () => {
    if (!bellOpen) {
      loadNotifications();
    }
    setBellOpen(!bellOpen);
    setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
    setBellOpen(false);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-section navbar-left">
        <div className="navbar-title">
          KRIDA VERSE
        </div>
        <div className="hamburger" onClick={() => setHamburgerActive(!hamburgerActive)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>

      <div className={`navbar-section navbar-center ${hamburgerActive ? 'active' : ''}`}>
        <div className="Nav-links">
          <Link to="/">Home</Link>
          <Link to="/registration">Registration</Link>
          <Link to="/schedule">Schedule</Link>
          <Link to="/live-score">Live Score</Link>
          <Link to="/contact-us">Contact Us</Link>
        </div>
      </div>

      <div className="navbar-section navbar-right nav-icons">
        <div className="notification-dropdown" ref={bellRef}>
          <span className="icon" id="bell-icon" onClick={toggleBell}>
            <i className="fa-solid fa-bell"></i>
          </span>
          <div className={`dropdown-menu ${bellOpen ? 'show' : ''}`} id="notification-dropdown-menu">
            {notifications.length > 0 ? (
              notifications.map((n, idx) => (
                <a key={idx} href={n.link || '#'} className="dropdown-item" target="_blank" rel="noreferrer">
                  <strong>{n.heading}: </strong>{n.content}
                </a>
              ))
            ) : (
              <a href="#" className="no-notifications" onClick={(e) => e.preventDefault()}>
                No new notifications.
              </a>
            )}
          </div>
        </div>

        <div className="profile-dropdown" ref={profileRef}>
          <span className="icon" id="profile-icon" onClick={toggleProfile}>
            <i className="fa-solid fa-user"></i>
          </span>
          <div className={`dropdown-menu ${profileOpen ? 'show' : ''}`} id="dropdown-menu">
            {loggedInUser ? (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</a>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/admin/login">Admin Portal</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
