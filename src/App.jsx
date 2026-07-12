import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import RegistrationForm from './pages/RegistrationForm';
import Dashboard from './pages/Dashboard';
import Schedules from './pages/Schedules';
import LiveScores from './pages/LiveScores';
import ContactUs from './pages/ContactUs';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminSchedules from './pages/admin/AdminSchedules';
import AdminScores from './pages/admin/AdminScores';
import AdminNotifications from './pages/admin/AdminNotifications';

import './App.css';

// Main layout wrapper that conditionally displays Navbar/Footer
function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <>
      {/* Hide global navbar on admin and user dashboard pages */}
      {!isAdminRoute && !isDashboardRoute && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/registration/:sport" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/schedule" element={<Schedules />} />
        <Route path="/live-score" element={<LiveScores />} />
        <Route path="/contact-us" element={<ContactUs />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/schedules" element={<AdminSchedules />} />
        <Route path="/admin/live-scores" element={<AdminScores />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />
      </Routes>

      {/* Hide global footer on admin and user dashboard pages */}
      {!isAdminRoute && !isDashboardRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
