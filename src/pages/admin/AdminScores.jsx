import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminScores.css';

function AdminScores() {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState({});
  const [todaysMatches, setTodaysMatches] = useState([]);
  const [selectedMatchKey, setSelectedMatchKey] = useState('');

  // Form States
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [score1, setScore1] = useState('');
  const [score2, setScore2] = useState('');
  const [extra, setExtra] = useState('');

  useEffect(() => {
    if (localStorage.getItem('adminLoggedIn') !== 'true') {
      navigate('/admin/login');
      return;
    }

    // Initialize mock data if empty
    const todayStr = new Date().toISOString().split('T')[0];
    if (!localStorage.getItem('tournaments')) {
      const demoTournaments = {
        cricket: [
          { team1: "India", team2: "Australia", date: todayStr, time: "10:00" }
        ],
        football: [
          { team1: "Real Madrid", team2: "Barcelona", date: todayStr, time: "18:00" }
        ]
      };
      localStorage.setItem('tournaments', JSON.stringify(demoTournaments));
    }

    if (!localStorage.getItem('live_scores')) {
      const demoLiveScores = {
        "cricket-India vs Australia": {
          team1: "India",
          team2: "Australia",
          score1: "284/4",
          score2: "Yet to bat",
          feature: "38.2",
          overs: "38.2"
        },
        "football-Real Madrid vs Barcelona": {
          team1: "Real Madrid",
          team2: "Barcelona",
          score1: "2",
          score2: "1",
          feature: "78:15",
          time: "78:15"
        }
      };
      localStorage.setItem('live_scores', JSON.stringify(demoLiveScores));
    }

    const data = JSON.parse(localStorage.getItem('tournaments')) || {};
    setTournaments(data);

    // Filter matches happening today
    const filteredMatches = [];

    for (const sport in data) {
      data[sport].forEach((match, index) => {
        if (match.date === todayStr) {
          filteredMatches.push({
            sport,
            index,
            key: `${sport}_${index}`,
            displayText: `${capitalize(sport)} - ${match.team1} vs ${match.team2}`,
            matchData: match
          });
        }
      });
    }
    setTodaysMatches(filteredMatches);
  }, [navigate]);

  const capitalize = (word) => {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const handleMatchSelect = (key) => {
    setSelectedMatchKey(key);
    if (!key) {
      setTeam1('');
      setTeam2('');
      setScore1('');
      setScore2('');
      setExtra('');
      return;
    }

    const selected = todaysMatches.find(m => m.key === key);
    if (selected) {
      const { sport, matchData } = selected;
      setTeam1(matchData.team1);
      setTeam2(matchData.team2);

      // Load existing live score for this match
      const liveScores = JSON.parse(localStorage.getItem('live_scores')) || {};
      const scoreKey = `${sport}-${matchData.team1} vs ${matchData.team2}`;
      const prevData = liveScores[scoreKey];

      setScore1(prevData?.score1 || '');
      setScore2(prevData?.score2 || '');
      
      const featureVal = sport === 'cricket' ? (prevData?.overs || '') : (prevData?.time || '');
      setExtra(featureVal || prevData?.feature || '');
    }
  };

  const updateScore = (e) => {
    e.preventDefault();
    if (!selectedMatchKey) {
      alert("Please select a match");
      return;
    }

    const selected = todaysMatches.find(m => m.key === selectedMatchKey);
    const { sport } = selected;

    const liveScores = JSON.parse(localStorage.getItem('live_scores')) || {};
    const scoreKey = `${sport}-${team1} vs ${team2}`;

    const entry = {
      team1,
      team2,
      score1,
      score2,
      feature: extra
    };

    if (sport === 'cricket') {
      entry.overs = extra;
    } else {
      entry.time = extra;
    }

    liveScores[scoreKey] = entry;
    localStorage.setItem('live_scores', JSON.stringify(liveScores));

    alert("Live score saved successfully!");
  };

  return (
    <div className="admin-scores-body" style={{ minHeight: '100vh', background: 'linear-gradient(to right, #0D1117, #1E293b)', padding: '40px 20px', color: '#ffffff' }}>
      <button onClick={() => navigate('/admin/dashboard')} style={{ background: '#58a6ff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '30px' }}>
        ← Back to Dashboard
      </button>

      <div className="glass" style={{ maxWidth: '600px', margin: '0 auto', padding: '30px', background: '#161b22', borderRadius: '15px', boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}>
        <h2 style={{ color: '#58a6ff', textAlign: 'center', marginBottom: '25px' }}>Update Live Match Score</h2>

        <label htmlFor="match">Select Live Match:</label>
        <select id="match" value={selectedMatchKey} onChange={(e) => handleMatchSelect(e.target.value)}>
          <option value="">-- Select Match --</option>
          {todaysMatches.map(m => (
            <option key={m.key} value={m.key}>{m.displayText}</option>
          ))}
        </select>

        {selectedMatchKey && (
          <form onSubmit={updateScore} style={{ marginTop: '25px' }}>
            <label>Team 1 Name:</label>
            <input type="text" value={team1} onChange={(e) => setTeam1(e.target.value)} required />

            <label>Team 2 Name:</label>
            <input type="text" value={team2} onChange={(e) => setTeam2(e.target.value)} required />

            <label>Team 1 Score:</label>
            <input type="text" value={score1} onChange={(e) => setScore1(e.target.value)} required />

            <label>Team 2 Score:</label>
            <input type="text" value={score2} onChange={(e) => setScore2(e.target.value)} required />

            <label>Feature (Overs / Time):</label>
            <input type="text" value={extra} onChange={(e) => setExtra(e.target.value)} required />

            <button type="submit" style={{ width: '100%', marginTop: '20px', padding: '12px', background: '#238636', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
              Update Score
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AdminScores;
