import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
        const apiUrl = codespaceName 
          ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
          : 'http://localhost:8000/api/leaderboard/';
        
        console.log('Leaderboard - Fetching from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        console.log('Leaderboard - Fetched data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      } catch (error) {
        console.error('Leaderboard - Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="container mt-4"><div className="alert alert-info">Loading leaderboard...</div></div>;
  if (error) return <div className="container mt-4"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
    <div className="container mt-4">
      <div className="page-header">
        <h2>🏆 Leaderboard</h2>
        <p>See who's leading the fitness challenge</p>
      </div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th style={{width: '80px'}}>Rank</th>
              <th>User</th>
              <th>Team</th>
              <th>Total Points</th>
              <th>Activities</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard.map((entry, index) => (
                <tr key={entry.id || index}>
                  <td>
                    <div className={`rank-badge ${
                      index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''
                    }`}>
                      {index + 1}
                    </div>
                  </td>
                  <td><strong>{entry.user_email || entry.user || 'N/A'}</strong></td>
                  <td><span className="badge bg-info">{entry.team_name || entry.team || 'N/A'}</span></td>
                  <td><span className="badge bg-success">{entry.total_points || 0} pts</span></td>
                  <td>{entry.activities_count || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No leaderboard data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
