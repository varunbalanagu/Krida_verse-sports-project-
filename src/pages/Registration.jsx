import React from 'react';
import { Link } from 'react-router-dom';
import './Registration.css';

const sports = [
  {
    id: "football",
    name: "Football",
    description: "Football is the most popular sport worldwide. Played between two teams using a round ball. It promotes stamina, strategy, and teamwork. Loved for its fast pace and thrilling goals."
  },
  {
    id: "cricket",
    name: "Cricket",
    description: "A bat-and-ball game played in various formats. Involves scoring runs and taking wickets. Builds patience, precision, and leadership. Cricket unites fans across the globe."
  },
  {
    id: "basketball",
    name: "Basketball",
    description: "A fast-paced team sport with dribbling, shooting, and teamwork. Encourages coordination and quick thinking. Played worldwide indoors and outdoors."
  },
  {
    id: "badminton",
    name: "Badminton",
    description: "A racket sport played with a shuttlecock. Requires speed, reflexes, and coordination. Popular in both singles and doubles formats. Great for improving focus and fitness."
  },
  {
    id: "kabaddi",
    name: "Kabaddi",
    description: "A traditional Indian contact team sport. Combines strength, strategy, and agility. Players raid and tag while holding their breath. Kabaddi builds courage and quick thinking."
  }
];

function Registration() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <header className="registration-header">
        <h1>Live Registrations</h1>
      </header>

      <main>
        <div className="cards-container">
          {sports.map((sport) => (
            <Link key={sport.id} to={`/registration/${sport.id}`}>
              <div className="card">
                <h2>{sport.name}</h2>
                <p>{sport.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Registration;
