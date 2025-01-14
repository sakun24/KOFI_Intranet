import React from 'react';
import './NotFound.css'; // Import the CSS file for styling

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404 - Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <a href="/landing/" className="home-link">Return to Home</a>
      </div>
    </div>
  );
};

export default NotFound;
