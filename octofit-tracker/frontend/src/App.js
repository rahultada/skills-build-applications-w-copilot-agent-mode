import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="app">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/logo.png" alt="OctoFit Logo" className="navbar-logo" />
              OctoFit Tracker
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
              <ul className="navbar-nav">
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
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={
              <div className="container">
                <div className="hero-section text-center">
                  <h1>🐙 Welcome to OctoFit Tracker</h1>
                  <p className="lead">Track your fitness journey with your team and compete for glory!</p>
                  <div className="mt-4">
                    <Link to="/users" className="btn btn-light btn-lg me-2 mb-2">
                      <i className="bi bi-people"></i> View Users
                    </Link>
                    <Link to="/teams" className="btn btn-light btn-lg me-2 mb-2">
                      <i className="bi bi-people-fill"></i> View Teams
                    </Link>
                    <Link to="/activities" className="btn btn-light btn-lg me-2 mb-2">
                      <i className="bi bi-activity"></i> View Activities
                    </Link>
                    <Link to="/workouts" className="btn btn-light btn-lg me-2 mb-2">
                      <i className="bi bi-heart-pulse"></i> View Workouts
                    </Link>
                    <Link to="/leaderboard" className="btn btn-warning btn-lg mb-2">
                      <i className="bi bi-trophy"></i> Leaderboard
                    </Link>
                  </div>
                </div>
              </div>
            } />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="footer mt-5 py-3 bg-light">
          <div className="container text-center">
            <span className="text-muted">OctoFit Tracker - Fitness App © 2026</span>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
