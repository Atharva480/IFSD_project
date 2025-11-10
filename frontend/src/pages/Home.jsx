import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <div className="glass fade-in" style={{ textAlign: 'center', padding: '3rem' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎨</div>
        <h1 style={{ 
          fontWeight: 800, 
          fontSize: '2.5rem',
          marginBottom: '1rem',
          background: 'var(--gradient-primary)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Welcome, {user?.name}! 👋
        </h1>
        <p style={{ color: 'var(--secondary)', fontSize: '1.2rem', fontWeight: 500, marginBottom: '2rem' }}>
          Ready to create amazing flyers?
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/designer" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
            ✨ Create Flyer
          </Link>
          <Link to="/feed" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-block' }}>
            📱 View Feed
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
