import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RegistrationForm.css';

const playerLimits = {
  cricket:    { min: 11, max: 15 },  
  football:   { min: 7,  max: 16 },  
  kabaddi:    { min: 7,  max: 12 },  
  volleyball: { min: 6,  max: 12 },  
  throwball:  { min: 6,  max: 12 },  
  basketball: { min: 5,  max: 12 }, 
  hockey:     { min: 7,  max: 16 }   
};

function RegistrationForm() {
  const { sport } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const limits = playerLimits[sport.toLowerCase()] || { min: 1, max: 15 };
  const sportName = sport.charAt(0).toUpperCase() + sport.slice(1);

  const [teamName, setTeamName] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  
  const [newMember, setNewMember] = useState('');
  const [members, setMembers] = useState([]);

  // Particle background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationId;
    let particlesArray = [];
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const mouse = {
      x: null,
      y: null,
      radius: 130
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      constructor(x, y, dirX, dirY, size, color) {
        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;
        this.size = size;
        this.baseSize = size;
        this.color = color;
      }

      draw() {
        ctx.beginPath();
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      update() {
        if (this.x + this.size > canvas.width || this.x - this.size < 0) this.dirX = -this.dirX;
        if (this.y + this.size > canvas.height || this.y - this.size < 0) this.dirY = -this.dirY;

        this.x += this.dirX;
        this.y += this.dirY;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius && this.size < 8) {
          this.size += 0.4;
        } else if (this.size > this.baseSize) {
          this.size -= 0.2;
          if (this.size < this.baseSize) this.size = this.baseSize;
        }

        this.draw();
      }
    }

    function init() {
      particlesArray = [];
      let num = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < num; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * (canvas.width - size * 2);
        let y = Math.random() * (canvas.height - size * 2);
        let dirX = (Math.random() - 0.5) * 1.2;
        let dirY = (Math.random() - 0.5) * 1.2;
        let r = Math.floor(Math.random() * 200 + 55);
        let g = Math.floor(Math.random() * 200 + 55);
        let b = Math.floor(Math.random() * 200 + 55);
        let color = `rgba(${r},${g},${b},0.8)`;
        particlesArray.push(new Particle(x, y, dirX, dirY, size, color));
      }
    }

    function connectLines() {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = dx * dx + dy * dy;

          if (distance < 16000) {
            let opacity = 1 - distance / 16000;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      animationId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(p => p.update());
      connectLines();
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', handleResize);

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const addMember = () => {
    const name = newMember.trim();
    if (!name) return;

    if (members.includes(name)) {
      alert("This name is already added.");
      return;
    }

    if (members.length >= limits.max) {
      alert(`Maximum ${limits.max} players allowed.`);
      return;
    }

    setMembers([...members, name]);
    setNewMember('');
  };

  const removeMember = (index) => {
    setMembers(members.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (members.length < limits.min) {
      alert(`Minimum ${limits.min} players required to register for ${sportName}.`);
      return;
    }

    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      alert("Please login first.");
      navigate('/login');
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map(user => {
      if (user.username === loggedInUser) {
        if (!user.teams) user.teams = {};
        user.teams[sport.toLowerCase()] = members;
      }
      return user;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    alert(`Registered for ${sportName} successfully!`);
    navigate('/dashboard');
  };

  return (
    <div className="form-page-body">
      <canvas id="particles" ref={canvasRef}></canvas>
      <div className="container" style={{ margin: '40px auto', position: 'relative', zIndex: 5 }}>
        <h1>{sportName} Registration Form</h1>
        <p>Enter your team details to register for the tournament.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Team Name</label>
            <input 
              type="text" 
              placeholder="Enter team name" 
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Branch</label>
            <select value={branch} onChange={(e) => setBranch(e.target.value)} required>
              <option value="" disabled hidden>Select branch</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
            </select>
          </div>

          <div className="form-group">
            <label>Year of Study</label>
            <select value={year} onChange={(e) => setYear(e.target.value)} required>
              <option value="" disabled hidden>Select year</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          <div className="form-group">
            <label>Team Members <small>(Min {limits.min}, Max {limits.max})</small></label>
            <div className="member-input">
              <input 
                type="text" 
                placeholder="Enter member name" 
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addMember(); } }}
              />
              <button type="button" className="addBtn" onClick={addMember}>Add</button>
            </div>
            
            <div className="member-box">
              {members.map((m, idx) => (
                <div key={idx} className="member-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 12px', background: '#161b22', borderRadius: '4px', marginBottom: '6px' }}>
                  <span>{m}</span>
                  <span className="remove-btn" onClick={() => removeMember(idx)} style={{ cursor: 'pointer' }}>❌</span>
                </div>
              ))}
            </div>
            <p className="total-members">Total Members: {members.length}</p>
          </div>

          <button type="submit" className="submit-btn">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
