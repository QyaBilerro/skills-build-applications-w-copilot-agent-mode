import { useState, useEffect } from 'react';
import { API_ENDPOINTS, fetchData } from '../config/api';

/**
 * Leaderboard Component
 * Fetches data from: https://{codespace-name}-8000.app.github.dev/api/leaderboard/
 * Displays competitive rankings with streaks
 */
export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      const data = await fetchData(API_ENDPOINTS.leaderboard);
      setLeaderboard(data);
      setLoading(false);
    }
    loadLeaderboard();
  }, []);

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>;

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <p className="text-muted">No leaderboard data found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th style={{ width: '60px' }}>Rank</th>
                <th>User</th>
                <th>Points</th>
                <th>Streak (days)</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry._id}>
                  <td>
                    <span className={`badge ${getMedalColor(entry.rank)}`}>
                      #{entry.rank}
                    </span>
                  </td>
                  <td>{entry.user?.name || '-'}</td>
                  <td className="fw-bold text-primary">{entry.points}</td>
                  <td>
                    <span className="badge bg-warning text-dark">
                      🔥 {entry.streakDays}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function getMedalColor(rank) {
  if (rank === 1) return 'bg-warning text-dark';
  if (rank === 2) return 'bg-secondary';
  if (rank === 3) return 'bg-danger';
  return 'bg-info';
}
