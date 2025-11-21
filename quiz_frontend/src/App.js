import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';

/**
 * App shell: applies theme and renders the common layout.
 * Individual routes are declared in index.js using react-router-dom.
 */
// PUBLIC_INTERFACE
function App({ children }) {
  const [theme, setTheme] = useState('light');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
      <header className="App-header" style={{ minHeight: 'auto' }}>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <NavBar />
      </header>
      <main className="container" style={{ padding: '24px 16px' }}>
        {children}
      </main>
    </div>
  );
}

export default App;
