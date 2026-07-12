import React, { useState, useEffect } from 'react';
import './Schedules.css';

function Schedules() {
  const [tournaments, setTournaments] = useState({});
  const [selectedTournament, setSelectedTournament] = useState('');
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Load tournaments from local storage
    const loadedTournaments = JSON.parse(localStorage.getItem('tournaments')) || {};
    setTournaments(loadedTournaments);

    const firstTournament = Object.keys(loadedTournaments)[0];
    if (firstTournament) {
      setSelectedTournament(firstTournament);
      setMatches(loadedTournaments[firstTournament] || []);
    }
  }, []);

  const selectTournament = (name) => {
    setSelectedTournament(name);
    setMatches(tournaments[name] || []);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-GB', options);
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    try {
      const [hour, minute] = timeStr.split(":");
      const date = new Date();
      date.setHours(hour, minute);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return timeStr;
    }
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <header className="navbar-sub" style={{ background: '#161b22', padding: '15px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
        {Object.keys(tournaments).length > 0 ? (
          Object.keys(tournaments).map((tName) => (
            <button
              key={tName}
              className={`nav-sub-link ${selectedTournament === tName ? 'active' : ''}`}
              onClick={() => selectTournament(tName)}
              style={{
                background: selectedTournament === tName ? '#58a6ff' : 'transparent',
                color: selectedTournament === tName ? 'white' : '#cad2c5',
                border: '1px solid #58a6ff',
                borderRadius: '20px',
                padding: '8px 20px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s'
              }}
            >
              {tName.toUpperCase()}
            </button>
          ))
        ) : (
          <span style={{ color: '#cad2c5' }}>No tournaments scheduled yet.</span>
        )}
      </header>

      <section className="schedule-section" style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 id="scheduleTitle" style={{ color: '#58a6ff', textAlign: 'center', marginBottom: '30px' }}>
          {selectedTournament ? `${selectedTournament.toUpperCase()} - Match Schedule` : 'Select a tournament to view schedule'}
        </h2>
        
        <table className="schedule-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Team 1</th>
              <th>Team 2</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody id="scheduleBody">
            {matches.length > 0 ? (
              matches.map((match, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{match.team1}</td>
                  <td>{match.team2}</td>
                  <td>{formatDate(match.date)}</td>
                  <td>{formatTime(match.time)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ color: '#aaa', textAlign: 'center' }}>
                  No matches scheduled for this tournament.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Schedules;
