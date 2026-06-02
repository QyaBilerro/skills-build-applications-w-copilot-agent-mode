import { useState, useEffect } from 'react';
import { API_ENDPOINTS, fetchData } from '../config/api';

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      const data = await fetchData(API_ENDPOINTS.users);
      setUsers(data);
      setLoading(false);
    }
    loadUsers();
  }, []);

  if (loading) return <div className="alert alert-info">Loading users...</div>;

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      {users.length === 0 ? (
        <p className="text-muted">No users found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Fitness Level</th>
                <th>Age</th>
                <th>Weekly Goal</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge bg-${getLevelColor(user.fitnessLevel)}`}>
                      {user.fitnessLevel}
                    </span>
                  </td>
                  <td>{user.age}</td>
                  <td>{user.weeklyGoal}</td>
                  <td>{user.team?.name || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function getLevelColor(level) {
  const colors = {
    beginner: 'success',
    intermediate: 'info',
    advanced: 'danger',
  };
  return colors[level] || 'secondary';
}
