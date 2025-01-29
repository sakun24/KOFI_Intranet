import React, { useState, useEffect } from 'react';

function PasswordProtection({ children }) {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const correctPassword = 'DASHBOARD@2025kofi'; // Replace with your desired password

  useEffect(() => {
    const storedAuth = localStorage.getItem('authenticated');
    const storedTimestamp = localStorage.getItem('timestamp');
    const currentTime = new Date().getTime();

    if (storedAuth && storedTimestamp && currentTime - storedTimestamp < 2 * 60 * 60 * 1000) {
      setAuthenticated(true);
    }
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitPassword = () => {
    if (password === correctPassword) {
      setAuthenticated(true);
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('timestamp', new Date().getTime());
    } else {
      alert('Incorrect password');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmitPassword();
    }
  };

  return authenticated ? (
    children // Render the child components (e.g., Dashboard) if authenticated
  ) : (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>WELCOME TO KOFI DASHBOARD</h2>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter password"
          style={styles.input}
        />
        <button onClick={handleSubmitPassword} style={styles.button}>
          Submit
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
    position: 'relative',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent color
    filter: 'blur(8px)',
    zIndex: -1,
  },
  card: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    zIndex: 1,
  },
  header: {
    marginBottom: '20px',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    width: '100%',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
  },
};

export default PasswordProtection;