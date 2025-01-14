import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Add state for password visibility
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isAuthenticated = login(username, password);

    if (isAuthenticated) {
      navigate('/landing/production_eform');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Production</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type={showPassword ? 'text' : 'password'}  // Toggle input type based on visibility
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <div className="show-password">
          <input
            type="checkbox"
            id="show-password"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}  // Toggle password visibility
          />
          <label className='label-showpass' htmlFor="show-password">Show Password</label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
