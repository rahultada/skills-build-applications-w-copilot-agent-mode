import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
        const apiUrl = codespaceName 
          ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
          : 'http://localhost:8000/api/teams/';
        
        console.log('Teams - Fetching from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        console.log('Teams - Fetched data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      } catch (error) {
        console.error('Teams - Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div className="container mt-4"><div className="alert alert-info">Loading teams...</div></div>;
  if (error) return <div className="container mt-4"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
    <div className="container mt-4">
      <div className="page-header">
        <h2>👥 Teams</h2>
        <p>Browse all fitness teams</p>
      </div>
      <div className="row">
        {teams.length > 0 ? (
          teams.map((team, index) => (
            <div key={team.id || index} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{team.name || 'Unnamed Team'}</h5>
                  <p className="card-text">{team.description || 'No description available'}</p>
                  <hr />
                  <p className="card-text mb-0">
                    <small className="text-muted">
                      <i className="bi bi-calendar"></i> Created: {team.created_at ? new Date(team.created_at).toLocaleDateString() : 'N/A'}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info">No teams found</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
