import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [adminEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsLoggedIn(!!token); // Set isLoggedIn based on token existence
  }, []); // Run only on component mount

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
  
    try {
      const response = await axios.post('http://localhost:8080/api/admin/login', {
        adminEmail,
        password,
      });
  
      if (response.status === 200) {
        localStorage.setItem('adminToken', response.data.token); // Store token
        setIsLoggedIn(true);
        navigate('/AdminDashboard'); // Redirect to Admin Dashboard
      }
    } catch (err) {
      console.error('Login Error:', err.response || err);
      setError('Invalid email or password.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Clear the token
    setIsLoggedIn(false); // Ensure state updates
    setEmail(''); // Reset email input
    setPassword(''); // Reset password input

    // Force re-render using a slight delay to reflect logout
    setTimeout(() => {
      navigate('/AdminLogin');
    }, 100);
  };

  return (
    <div style={{ height: '100vh', width: '100vw', paddingTop: '1rem', backgroundColor: 'rgba(25, 25, 25, 0.81)' }}>
      <div style={styles.container}>
        <h1 style={styles.header}>Admin {isLoggedIn ? 'Dashboard' : 'Login'}</h1>

        {error && <p style={styles.error}>{error}</p>}

        {isLoggedIn ? (
          <button onClick={handleLogout} style={styles.button}>Logout</button>
        ) : (
          <form style={styles.form} onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={adminEmail}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button}>Login</button>
          </form>
        )}
      </div>
    </div>
  );
}

// CSS-in-JS Styles
const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    maxWidth: '400px',
    margin: 'auto',
    marginTop: '10%',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(25, 25, 25, 0.81)',
  },
  header: {
    textAlign: 'center',
    paddingTop: '1rem',
    marginBottom: '1.5rem',
    color: '#0056b3',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '0.8rem',
    margin: '0.5rem 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  button: {
    padding: '0.8rem',
    marginTop: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
    textAlign: 'center',
  },
};

export default AdminLogin;
