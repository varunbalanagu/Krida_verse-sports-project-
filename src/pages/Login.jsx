import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  // SignUp Form State
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  // Login Form State
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [modeCheckbox, setModeCheckbox] = useState(false);

  useEffect(() => {
    // Populate sample users if empty
    if (!localStorage.getItem("users")) {
      const sampleUsers = [
        { username: "john_doe", password: "helloWorld", email: "john@example.com" },
        { username: "varun123", password: "pass123", email: "varun@example.com" },
      ];
      localStorage.setItem("users", JSON.stringify(sampleUsers));
    }
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    const username = signupUsername.trim();
    const email = signupEmail.trim();
    const password = signupPassword.trim();

    if (!username || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.some(user => user.username === username);

    if (exists) {
      alert("Username already exists.");
      return;
    }

    users.push({ username, password, email });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", username);

    alert("Registration successful!");
    navigate('/');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const username = loginUsername.trim();
    const password = loginPassword.trim();

    if (!username || !password) {
      alert('Please fill in all fields.');
      return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      localStorage.setItem("loggedInUser", username);
      alert("Login successful!");
      navigate('/');
    } else {
      alert("Invalid username or password.");
    }
  };

  return (
    <div className="login-page-body">
      <h2 className="header">Krida<span>Verse</span></h2>

      <div className="main">
        <input 
          type="checkbox" 
          id="chk" 
          aria-hidden="true" 
          checked={modeCheckbox}
          onChange={() => setModeCheckbox(!modeCheckbox)}
        />

        <div className="signup">
          <form onSubmit={handleSignup}>
            <label htmlFor="chk" aria-hidden="true">Sign up</label>
            <input 
              type="text" 
              placeholder="User name" 
              value={signupUsername} 
              onChange={(e) => setSignupUsername(e.target.value)} 
              required 
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={signupEmail} 
              onChange={(e) => setSignupEmail(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={signupPassword} 
              onChange={(e) => setSignupPassword(e.target.value)} 
              required 
            />
            <button type="submit">Sign up</button>
          </form>
        </div>

        <div className="login">
          <form onSubmit={handleLogin}>
            <label htmlFor="chk" aria-hidden="true">Login</label>
            <input 
              type="text" 
              placeholder="User name" 
              value={loginUsername} 
              onChange={(e) => setLoginUsername(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={loginPassword} 
              onChange={(e) => setLoginPassword(e.target.value)} 
              required 
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
