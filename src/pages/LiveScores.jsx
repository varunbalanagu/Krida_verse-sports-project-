import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import './LiveScores.css';

function LiveScores() {
  const [liveScores, setLiveScores] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [summaryToggled, setSummaryToggled] = useState({});

  useEffect(() => {
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

    const loadedScores = JSON.parse(localStorage.getItem('live_scores')) || {};
    setLiveScores(loadedScores);
  }, []);

  const keys = Object.keys(liveScores);

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextSlide = () => {
    if (currentIndex < keys.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const toggleSummary = (matchKey) => {
    setSummaryToggled({
      ...summaryToggled,
      [matchKey]: !summaryToggled[matchKey]
    });
  };

  const parseNumericScore = (scoreStr) => {
    if (!scoreStr) return 0;
    const match = scoreStr.toString().match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getPieData = (sport) => {
    switch (sport.toLowerCase()) {
      case "cricket":
        return {
          labels: ["Bowled", "Caught", "Run Out"],
          series: [2, 3, 1]
        };
      case "kabaddi":
        return {
          labels: ["Raids", "Tackles", "All-outs"],
          series: [22, 15, 5]
        };
      case "basketball":
        return {
          labels: ["3PT", "Assists", "Fouls"],
          series: [8, 15, 12]
        };
      case "volleyball":
        return {
          labels: ["Aces", "Blocks", "Errors"],
          series: [6, 5, 2]
        };
      case "football":
        return {
          labels: ["Possession", "Shots", "Fouls"],
          series: [55, 30, 15]
        };
      default:
        return {
          labels: ["Team 1", "Team 2"],
          series: [50, 50]
        };
    }
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', position: 'relative' }}>
      <div className="nav-buttons">
        <button onClick={prevSlide} disabled={currentIndex === 0}>←</button>
        <button onClick={nextSlide} disabled={currentIndex === keys.length - 1}>→</button>
      </div>

      <div className="slider-wrapper">
        <div 
          className="slider-container" 
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`
          }}
        >
          {keys.map((key) => {
            const [sport] = key.split('-');
            const matchData = liveScores[key];
            const { team1, team2, score1, score2, feature, overs, time } = matchData;

            const isCricket = sport.toLowerCase() === "cricket";
            const featureLabel = isCricket ? "Overs" : "Time";
            const rawFeature = isCricket ? (overs !== undefined ? overs : feature) : (time !== undefined ? time : feature);

            let cleanFeature = '';
            if (rawFeature !== undefined && rawFeature !== null) {
              cleanFeature = rawFeature.toString().trim();
              if (/^(overs|time)\s*:/i.test(cleanFeature)) {
                cleanFeature = cleanFeature.replace(/^(overs|time)\s*:\s*/i, '');
              }
            }

            const pieData = getPieData(sport);

            const barOptions = {
              chart: { type: 'bar', toolbar: { show: false } },
              theme: { mode: 'dark' },
              plotOptions: {
                bar: {
                  borderRadius: 4,
                  columnWidth: '45%',
                  distributed: true,
                  dataLabels: { position: 'top' }
                }
              },
              colors: ['#3b82f6', '#ef4444'],
              xaxis: { 
                categories: [team1, team2],
                labels: { style: { colors: '#cad2c5', fontSize: '12px' } }
              },
              yaxis: {
                labels: { style: { colors: '#cad2c5' } }
              },
              dataLabels: {
                enabled: true,
                offsetY: -20,
                style: { fontSize: '11px', colors: ["#fff"] }
              },
              title: { 
                text: "Score Comparison", 
                align: 'center', 
                style: { color: '#58A6FF', fontSize: '15px', fontWeight: 'bold' } 
              },
              grid: { borderColor: 'rgba(255,255,255,0.08)' }
            };

            const barSeries = [{
              name: 'Score',
              data: [parseNumericScore(score1), parseNumericScore(score2)]
            }];

            const donutOptions = {
              chart: { type: 'donut' },
              theme: { mode: 'dark' },
              labels: pieData.labels,
              colors: ['#10b981', '#f59e0b', '#3b82f6', '#ec4899'],
              title: { 
                text: `${capitalize(sport)} Stats`, 
                align: 'center', 
                style: { color: '#58A6FF', fontSize: '15px', fontWeight: 'bold' } 
              },
              legend: { 
                position: 'bottom',
                labels: { colors: '#cad2c5' } 
              },
              plotOptions: {
                pie: {
                  donut: {
                    size: '65%',
                    labels: {
                      show: true,
                      total: {
                        show: true,
                        label: 'Total',
                        color: '#cad2c5',
                        formatter: function (w) {
                          return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                        }
                      }
                    }
                  }
                }
              },
              dataLabels: { enabled: false }
            };

            return (
              <div 
                key={key} 
                className="slide"
              >
                <h1 style={{ color: '#58A6FF', textAlign: 'center', marginTop: '10px' }}>
                  Live {capitalize(sport)} Dashboard
                </h1>
                
                <div className="section">
                  <h2>Live Score</h2>
                  <div className="team">
                    <div>
                      <span className="label">{team1} Score: </span>
                      <span>{score1}</span>
                    </div>
                  </div>
                  <div className="team">
                    <div>
                      <span className="label">{team2} Score: </span>
                      <span>{score2}</span>
                    </div>
                  </div>
                  <div className="team">
                    <div>
                      <span className="label">{featureLabel}: </span>
                      <span>{cleanFeature}</span>
                    </div>
                  </div>

                  <button 
                    className="summary-btn" 
                    onClick={() => toggleSummary(key)}
                  >
                    Match Summary
                  </button>

                  <div 
                    className="summary animate-fade" 
                    style={{ display: summaryToggled[key] ? 'block' : 'none', marginTop: '15px' }}
                  >
                    <p><strong>Venue:</strong> Sample Stadium</p>
                    <p><strong>Status:</strong> Match in progress</p>
                  </div>

                  <div className="chart-section" style={{ marginTop: '30px' }}>
                    <div className="chart-row">
                      <div className="chart-box">
                        <Chart 
                          options={barOptions} 
                          series={barSeries} 
                          type="bar" 
                          height={250} 
                        />
                      </div>
                      <div className="chart-box">
                        <Chart 
                          options={donutOptions} 
                          series={pieData.series} 
                          type="donut" 
                          height={250} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LiveScores;
