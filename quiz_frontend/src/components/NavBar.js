import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

// PUBLIC_INTERFACE
export default function NavBar() {
  /** Simple top navigation bar with links to core routes. */
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <Link to="/">Study Quiz</Link>
        </div>
        <div className="links">
          <Link to="/">Upload</Link>
          <Link to="/quizzes">Quizzes</Link>
        </div>
      </div>
    </nav>
  );
}
