import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
        const apiUrl = codespaceName 
          ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
          : 'http://localhost:8000/api/workouts/';
        
        console.log('Workouts - Fetching from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        console.log('Workouts - Fetched data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      } catch (error) {
        console.error('Workouts - Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div className="container mt-4"><div className="alert alert-info">Loading workouts...</div></div>;
  if (error) return <div className="container mt-4"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
    <div className="container mt-4">
      <div className="page-header">
        <h2>💪 Personalized Workouts</h2>
        <p>Discover workout routines tailored to your fitness level</p>
      </div>
      <div className="row">
        {workouts.length > 0 ? (
          workouts.map((workout, index) => {
            const difficultyColors = {
              beginner: 'success',
              intermediate: 'info',
              advanced: 'warning',
              expert: 'danger'
            };
            const difficulty = workout.difficulty_level || 'beginner';
            return (
              <div key={workout.id || index} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 workout-card">
                  <div className="card-body">
                    <h5 className="card-title">{workout.name || 'Unnamed Workout'}</h5>
                    <h6 className="card-subtitle mb-3">
                      {workout.workout_type || 'General'}
                    </h6>
                    <p className="card-text">{workout.description || 'No description available'}</p>
                    <hr />
                    <div className="mb-3">
                      <span className="badge bg-primary me-2 mb-2">
                        ⏱️ {workout.duration || 0} min
                      </span>
                      <span className={`badge bg-${difficultyColors[difficulty]} me-2 mb-2`}>
                        📈 {difficulty}
                      </span>
                      <span className="badge bg-warning mb-2">
                        🔥 {workout.calories_target || 0} cal
                      </span>
                    </div>
                    {workout.exercises && (
                      <div>
                        <strong className="text-muted">Exercises:</strong>
                        <ul className="list-unstyled ms-2 mt-2">
                          {workout.exercises.split(',').map((exercise, idx) => (
                            <li key={idx} className="mb-1">✓ {exercise.trim()}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-12">
            <div className="alert alert-info">No workouts found</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;
