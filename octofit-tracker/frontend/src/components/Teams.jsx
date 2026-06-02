import { useState, useEffect } from 'react';
import { API_ENDPOINTS, fetchData } from '../config/api';

export function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeams() {
      const data = await fetchData(API_ENDPOINTS.teams);
      setTeams(data);
      setLoading(false);
    }
    loadTeams();
  }, []);

  if (loading) return <div className="alert alert-info">Loading teams...</div>;

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      {teams.length === 0 ? (
        <p className="text-muted">No teams found</p>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">
                    <strong>City:</strong> {team.city}<br />
                    <strong>Focus:</strong> {team.focus}
                  </p>
                  <div className="mt-3">
                    <strong>Members:</strong>
                    {team.members && team.members.length > 0 ? (
                      <ul className="list-unstyled mt-2">
                        {team.members.map((member) => (
                          <li key={member._id}>
                            <span className="badge bg-secondary">{member.name}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted">No members yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
