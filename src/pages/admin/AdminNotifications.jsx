import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminNotifications.css';

function AdminNotifications() {
  const navigate = useNavigate();
  const [heading, setHeading] = useState('');
  const [message, setMessage] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    if (localStorage.getItem('adminLoggedIn') !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const saveNotification = (e) => {
    e.preventDefault();
    const head = heading.trim();
    const msg = message.trim();
    const lnk = link.trim();

    if (!head || !msg) {
      alert("Heading and content are required.");
      return;
    }

    const newNotification = {
      heading: head,
      content: msg,
      link: lnk || ""
    };

    // Save to both notification keys for bulletproof compatibility
    const existingData1 = JSON.parse(localStorage.getItem('notification_data')) || [];
    existingData1.push(newNotification);
    localStorage.setItem('notification_data', JSON.stringify(existingData1));

    const existingData2 = JSON.parse(localStorage.getItem('notification')) || [];
    existingData2.push(newNotification);
    localStorage.setItem('notification', JSON.stringify(existingData2));

    alert("Notification saved successfully!");

    // Reset Form
    setHeading('');
    setMessage('');
    setLink('');
  };

  return (
    <div className="admin-notifications-body" style={{ minHeight: '100vh', background: 'linear-gradient(to right, #0D1117, #1E293b)', padding: '40px 20px', color: '#ffffff' }}>
      <button onClick={() => navigate('/admin/dashboard')} style={{ background: '#58a6ff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '30px' }}>
        ← Back to Dashboard
      </button>

      <div className="glass" style={{ maxWidth: '600px', margin: '0 auto', padding: '30px', background: '#161b22', borderRadius: '15px', boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}>
        <h2 style={{ color: '#58a6ff', textAlign: 'center', marginBottom: '25px' }}>Send Sports Notification</h2>

        <form onSubmit={saveNotification}>
          <label htmlFor="heading">Notification Heading:</label>
          <input 
            type="text" 
            id="heading" 
            placeholder="e.g. Football Match Update" 
            value={heading} 
            onChange={(e) => setHeading(e.target.value)} 
            required 
          />

          <label htmlFor="message">Notification Content:</label>
          <textarea 
            id="message" 
            placeholder="Enter notification details..." 
            rows="4" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required
          ></textarea>

          <label htmlFor="link">Redirect Link (Optional):</label>
          <input 
            type="url" 
            id="link" 
            placeholder="e.g. https://example.com/match" 
            value={link} 
            onChange={(e) => setLink(e.target.value)} 
          />

          <button type="submit" style={{ width: '100%', marginTop: '20px', padding: '12px', background: '#238636', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Send Notification
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminNotifications;
