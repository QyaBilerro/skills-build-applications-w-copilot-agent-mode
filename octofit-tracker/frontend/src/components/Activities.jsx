import { useState, useEffect } from 'react';
import { API_ENDPOINTS, fetchData } from '../config/api';

/**
 * Activities Component
 * Fetches data from: https://{codespace-name}-8000.app.github.dev/api/activities/
 * Displays workout activities with duration and calories burned
 */
export function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivities() {
      const data = await fetchData(API_ENDPOINTS.activities);
      setActivities(data);
      setLoading(false);
    }
    loadActivities();
  }, []);

  if (loading) return <div className="alert alert-info">Loading activities...</div>;

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p className="text-muted">No activities found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Distance (km)</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id}>
                  <td>{activity.user?.name || '-'}</td>
                  <td>{activity.type}</td>
                  <td>{activity.durationMinutes}</td>
                  <td>{activity.distanceKm || '-'}</td>
                  <td>{activity.caloriesBurned}</td>
                  <td>{new Date(activity.performedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
