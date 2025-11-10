import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <div className="glass fade-in" style={{ textAlign: 'center', padding: '2.5rem' }}>
        <img 
          src={`https://ui-avatars.com/api/?name=${user?.name}&background=random&size=120`} 
          alt="avatar" 
          style={{ 
            borderRadius: '50%', 
            marginBottom: '1.5rem',
            border: '4px solid var(--primary)',
            boxShadow: 'var(--shadow-lg)'
          }} 
        />
        <h2 style={{ 
          fontWeight: 800, 
          fontSize: '2rem',
          marginBottom: '0.5rem',
          background: 'var(--gradient-primary)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {user?.name}
        </h2>
        <p style={{ color: 'var(--secondary)', fontSize: '1.1rem', fontWeight: 500, marginBottom: '2rem' }}>
          {user?.email}
        </p>
        <div style={{ 
          display: 'flex', 
          gap: '2rem', 
          justifyContent: 'center',
          marginTop: '2rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(0,0,0,0.1)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>0</div>
            <div style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.25rem' }}>Flyers</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--secondary)' }}>0</div>
            <div style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.25rem' }}>Likes</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)' }}>0</div>
            <div style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.25rem' }}>Comments</div>
          </div>
        </div>
      </div>
      <div className="glass fade-in" style={{ marginTop: '2rem', padding: '2rem', textAlign: 'center' }}>
        <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1.5rem' }}>Your Flyers</h3>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎨</div>
        <p style={{ color: 'var(--secondary)', fontSize: '1.1rem', fontWeight: 500 }}>Start creating your first flyer!</p>
      </div>
    </div>
  );
};
export default Profile;
