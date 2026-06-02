import { useState, useEffect } from 'react';
import { API_ENDPOINTS, fetchData } from '../config/api';

export function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      const data = await fetchData(API_ENDPOINTS.workouts);
      setWorkouts(data);
      setLoading(false);
    }
    loadWorkouts();
  }, []);

  if (loading) return <div className="alert alert-info">Loading workouts...</div>;

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p className="text-muted">No workouts found</p>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{workout.title}</h5>
                  <p className="card-text">
                    <strong>User:</strong> {workout.user?.name || '-'}<br />
                    <strong>Category:</strong> {workout.category}<br />
                    <strong>Difficulty:</strong>
                    <span className={`badge bg-${getDifficultyColor(workout.difficulty)} ms-1`}>
                      {workout.difficulty}
                    </span><br />
                    <strong>Duration:</strong> {workout.durationMinutes} min
                  </p>
                  {workout.exercises && workout.exercises.length > 0 && (
                    <div className="mt-3">
                      <strong>Exercises:</strong>
                      <ul className="small">
                        {workout.exercises.map((exercise, idx) => (
                          <li key={idx}>{exercise}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getDifficultyColor(difficulty) {
  const colors = {
    easy: 'success',
    medium: 'warning',
    hard: 'danger',
  };
  return colors[difficulty] || 'secondary';
}
