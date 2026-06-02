import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Users } from './components/Users';
import { Teams } from './components/Teams';
import { Activities } from './components/Activities';
import { Leaderboard } from './components/Leaderboard';
import { Workouts } from './components/Workouts';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column">
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold" to="/">
              🏃 OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-dark text-white text-center py-3 mt-5">
          <p className="mb-0">
            &copy; 2026 OctoFit Tracker - Multi-tier Application with React 19, Express, and MongoDB
          </p>
        </footer>
      </div>
    </Router>
  );
}


function Home() {
  return (
    <div className="container mt-5">
      <div className="jumbotron bg-light p-5 rounded-lg">
        <h1 className="display-4 mb-4">Welcome to OctoFit Tracker 🏆</h1>
        <p className="lead">
          A modern multi-tier fitness tracking application built with React 19, Node.js/Express, and MongoDB.
        </p>

        <hr className="my-4" />

        <h3 className="mb-3">Features:</h3>
        <ul className="list-group list-group-flush mb-4">
          <li className="list-group-item">
            <strong>👥 Users</strong> - Manage fitness profiles and team memberships
          </li>
          <li className="list-group-item">
            <strong>🏅 Teams</strong> - Create and manage fitness teams by city
          </li>
          <li className="list-group-item">
            <strong>📊 Activities</strong> - Log and track workout activities
          </li>
          <li className="list-group-item">
            <strong>🎯 Leaderboard</strong> - Compete and track achievement streaks
          </li>
          <li className="list-group-item">
            <strong>💪 Workouts</strong> - Browse and plan structured workout programs
          </li>
        </ul>

        <div className="alert alert-info" role="alert">
          <strong>Codespaces Support:</strong> This application is configured to work with GitHub Codespaces.
          Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to enable Codespaces API endpoints.
        </div>

        <div className="mt-4">
          <p className="text-muted">
            Start exploring by clicking on the navigation menu above!
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
