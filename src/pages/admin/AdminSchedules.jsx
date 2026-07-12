import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminSchedules.css';

function AdminSchedules() {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState({});
  const [action, setAction] = useState('new'); // 'new', 'existing', 'delete'

  // New Tournament States
  const [newTournamentName, setNewTournamentName] = useState('');
  const [newMatchCount, setNewMatchCount] = useState(1);
  const [newMatches, setNewMatches] = useState([{ team1: '', team2: '', date: '', time: '' }]);

  // Existing Tournament States
  const [selectedExisting, setSelectedExisting] = useState('');
  const [existingMatches, setExistingMatches] = useState([]);
  const [addMatchCount, setAddMatchCount] = useState(1);

  // Delete Tournament States
  const [selectedDelete, setSelectedDelete] = useState('');

  useEffect(() => {
    if (localStorage.getItem('adminLoggedIn') !== 'true') {
      navigate('/admin/login');
      return;
    }
    const data = JSON.parse(localStorage.getItem("tournaments")) || {};
    setTournaments(data);
  }, [navigate]);

  const saveToLocalStorage = (updatedData) => {
    localStorage.setItem("tournaments", JSON.stringify(updatedData));
    setTournaments(updatedData);
  };

  // Sync match list length when newMatchCount changes
  const handleMatchCountChange = (count) => {
    const parsed = parseInt(count, 10) || 1;
    setNewMatchCount(parsed);
    const updated = [...newMatches];
    if (parsed > updated.length) {
      while (updated.length < parsed) {
        updated.push({ team1: '', team2: '', date: '', time: '' });
      }
    } else {
      updated.length = parsed;
    }
    setNewMatches(updated);
  };

  const handleMatchFieldChange = (index, field, value) => {
    const updated = [...newMatches];
    updated[index][field] = value;
    setNewMatches(updated);
  };

  const saveNewTournament = (e) => {
    e.preventDefault();
    const name = newTournamentName.trim().toLowerCase();
    if (!name) {
      alert("Please enter a tournament name.");
      return;
    }

    // Validation
    for (let i = 0; i < newMatches.length; i++) {
      const { team1, team2, date, time } = newMatches[i];
      if (!team1.trim() || !team2.trim() || !date || !time) {
        alert(`Please fill in all fields for Match ${i + 1}.`);
        return;
      }
    }

    const updated = { ...tournaments };
    updated[name] = newMatches;
    saveToLocalStorage(updated);
    alert("New tournament saved successfully!");
    
    // Reset
    setNewTournamentName('');
    setNewMatchCount(1);
    setNewMatches([{ team1: '', team2: '', date: '', time: '' }]);
  };

  // Existing Match Actions
  const handleExistingSelect = (name) => {
    setSelectedExisting(name);
    setExistingMatches(tournaments[name] ? JSON.parse(JSON.stringify(tournaments[name])) : []);
  };

  const handleExistingMatchFieldChange = (index, field, value) => {
    const updated = [...existingMatches];
    updated[index][field] = value;
    setExistingMatches(updated);
  };

  const removeExistingMatch = (index) => {
    setExistingMatches(existingMatches.filter((_, idx) => idx !== index));
  };

  const addMoreMatches = () => {
    const updated = [...existingMatches];
    for (let i = 0; i < addMatchCount; i++) {
      updated.push({ team1: '', team2: '', date: '', time: '' });
    }
    setExistingMatches(updated);
  };

  const saveExistingTournament = (e) => {
    e.preventDefault();
    if (!selectedExisting) {
      alert("Please select a tournament.");
      return;
    }

    // Validation
    for (let i = 0; i < existingMatches.length; i++) {
      const { team1, team2, date, time } = existingMatches[i];
      if (!team1.trim() || !team2.trim() || !date || !time) {
        alert(`Please fill in all fields for Match ${i + 1}.`);
        return;
      }
    }

    const updated = { ...tournaments };
    updated[selectedExisting] = existingMatches;
    saveToLocalStorage(updated);
    alert("Tournament schedule updated successfully!");
  };

  const handleDelete = () => {
    if (!selectedDelete) {
      alert("Please select a tournament to delete.");
      return;
    }
    const confirmDelete = window.confirm(`Are you sure you want to delete the tournament "${selectedDelete}"?`);
    if (confirmDelete) {
      const updated = { ...tournaments };
      delete updated[selectedDelete];
      saveToLocalStorage(updated);
      setSelectedDelete('');
      alert("Tournament deleted successfully!");
    }
  };

  return (
    <div className="admin-schedules-body" style={{ minHeight: '100vh', background: 'linear-gradient(to right, #0D1117, #1E293b)', padding: '40px 20px', color: '#ffffff' }}>
      <button onClick={() => navigate('/admin/dashboard')} style={{ background: '#58a6ff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '30px' }}>
        ← Back to Dashboard
      </button>

      <div className="glass" style={{ maxWidth: '800px', margin: '0 auto', padding: '30px', background: '#161b22', borderRadius: '15px', boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}>
        <h2 style={{ color: '#58a6ff', textAlign: 'center', marginBottom: '25px' }}>Tournament Schedule Manager</h2>

        <div className="actions" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '35px' }}>
          <button className={`selector ${action === 'new' ? 'selected' : ''}`} onClick={() => setAction('new')}>Create New</button>
          <button className={`selector ${action === 'existing' ? 'selected' : ''}`} onClick={() => setAction('existing')}>Edit Existing</button>
          <button className={`selector ${action === 'delete' ? 'selected' : ''}`} onClick={() => setAction('delete')}>Delete</button>
        </div>

        {action === 'new' && (
          <form onSubmit={saveNewTournament}>
            <h3>Create New Tournament</h3>
            <label>Tournament Name (Sport Name):</label>
            <input 
              type="text" 
              placeholder="e.g. cricket, football" 
              value={newTournamentName}
              onChange={(e) => setNewTournamentName(e.target.value)}
              required 
            />

            <label>Number of Matches:</label>
            <input 
              type="number" 
              min="1" 
              value={newMatchCount}
              onChange={(e) => handleMatchCountChange(e.target.value)}
              required 
            />

            <div style={{ marginTop: '20px' }}>
              {newMatches.map((match, idx) => (
                <div key={idx} className="match-block" style={{ padding: '15px', background: '#21262d', borderRadius: '8px', marginBottom: '15px' }}>
                  <h4 style={{ color: '#00ffcc', marginBottom: '10px' }}>Match {idx + 1}</h4>
                  <label>Team 1 Name:</label>
                  <input type="text" placeholder="Team 1" value={match.team1} onChange={(e) => handleMatchFieldChange(idx, 'team1', e.target.value)} required />
                  
                  <label>Team 2 Name:</label>
                  <input type="text" placeholder="Team 2" value={match.team2} onChange={(e) => handleMatchFieldChange(idx, 'team2', e.target.value)} required />
                  
                  <label>Date:</label>
                  <input type="date" value={match.date} onChange={(e) => handleMatchFieldChange(idx, 'date', e.target.value)} required />
                  
                  <label>Time:</label>
                  <input type="time" value={match.time} onChange={(e) => handleMatchFieldChange(idx, 'time', e.target.value)} required />
                </div>
              ))}
            </div>
            
            <button type="submit" style={{ width: '100%', padding: '12px', background: '#238636', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
              Save New Tournament
            </button>
          </form>
        )}

        {action === 'existing' && (
          <div>
            <h3>Edit Existing Tournament</h3>
            <label>Select Tournament:</label>
            <select value={selectedExisting} onChange={(e) => handleExistingSelect(e.target.value)}>
              <option value="">-- Select Tournament --</option>
              {Object.keys(tournaments).map(name => (
                <option key={name} value={name}>{name.toUpperCase()}</option>
              ))}
            </select>

            {selectedExisting && (
              <form onSubmit={saveExistingTournament} style={{ marginTop: '20px' }}>
                <div className="existing-matches">
                  {existingMatches.map((match, idx) => (
                    <div key={idx} className="match-block" style={{ padding: '15px', background: '#21262d', borderRadius: '8px', marginBottom: '15px', position: 'relative' }}>
                      <h4 style={{ color: '#00ffcc', marginBottom: '10px' }}>Match {idx + 1}</h4>
                      <button 
                        type="button" 
                        onClick={() => removeExistingMatch(idx)}
                        style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '18px' }}
                      >
                        ❌ Remove
                      </button>

                      <label>Team 1 Name:</label>
                      <input type="text" value={match.team1} onChange={(e) => handleExistingMatchFieldChange(idx, 'team1', e.target.value)} required />
                      
                      <label>Team 2 Name:</label>
                      <input type="text" value={match.team2} onChange={(e) => handleExistingMatchFieldChange(idx, 'team2', e.target.value)} required />
                      
                      <label>Date:</label>
                      <input type="date" value={match.date} onChange={(e) => handleExistingMatchFieldChange(idx, 'date', e.target.value)} required />
                      
                      <label>Time:</label>
                      <input type="time" value={match.time} onChange={(e) => handleExistingMatchFieldChange(idx, 'time', e.target.value)} required />
                    </div>
                  ))}
                </div>

                <div className="add-more-matches" style={{ padding: '15px', background: '#21262d', borderRadius: '8px', marginBottom: '25px', display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <label style={{ margin: 0 }}>Add more matches:</label>
                  <input type="number" min="1" style={{ width: '80px', margin: 0 }} value={addMatchCount} onChange={(e) => setAddMatchCount(parseInt(e.target.value, 10) || 1)} />
                  <button type="button" onClick={addMoreMatches} style={{ background: '#58a6ff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    ➕ Add
                  </button>
                </div>

                <button type="submit" style={{ width: '100%', padding: '12px', background: '#238636', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Update Tournament Schedule
                </button>
              </form>
            )}
          </div>
        )}

        {action === 'delete' && (
          <div>
            <h3>Delete Tournament</h3>
            <label>Select Tournament to Delete:</label>
            <select value={selectedDelete} onChange={(e) => setSelectedDelete(e.target.value)}>
              <option value="">-- Choose Tournament --</option>
              {Object.keys(tournaments).map(name => (
                <option key={name} value={name}>{name.toUpperCase()}</option>
              ))}
            </select>
            
            {selectedDelete && (
              <button 
                onClick={handleDelete}
                style={{ width: '100%', marginTop: '20px', padding: '12px', background: '#d9534f', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Delete Tournament
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminSchedules;
