import React, { useState, useContext } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { ToastContext } from '../context/ToastContext';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useContext(ToastContext);

  const handleSearch = async e => {
    e.preventDefault();
    if (!query.trim()) {
      addToast('Please enter a search term', 'warning');
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.get(`/auth/users/search?name=${query}`);
      setResults(data);
      if (data.length === 0) {
        addToast('No users found', 'info');
      }
    } catch {
      setResults([]);
      addToast('Search failed', 'error');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2 style={{ 
        textAlign: 'center', 
        fontWeight: 800, 
        marginBottom: '2rem',
        fontSize: '2rem',
        background: 'var(--gradient-primary)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        🔍 Search Users
      </h2>
      <form onSubmit={handleSearch} className="glass fade-in" style={{ display: 'flex', gap: '1rem', padding: '1.5rem', marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search users by name..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ 
            flex: 1, 
            padding: '1rem', 
            borderRadius: '16px', 
            border: '1px solid rgba(0,0,0,0.1)', 
            fontSize: '1rem',
            background: 'rgba(255,255,255,0.7)',
            transition: 'all 0.3s ease'
          }}
        />
        <button 
          type="submit" 
          disabled={loading}
          className="btn-primary"
          style={{ 
            padding: '1rem 1.5rem',
            fontSize: '1rem',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div className="spinner" style={{ width: '18px', height: '18px' }}></div>
              Searching...
            </span>
          ) : (
            '🔍 Search'
          )}
        </button>
      </form>
      <div style={{ marginTop: '2rem' }}>
        {loading ? (
          <div className="glass fade-in" style={{ textAlign: 'center', padding: '2rem' }}>
            <div className="spinner" style={{ margin: '0 auto', width: '40px', height: '40px' }}></div>
            <p style={{ marginTop: '1rem', color: '#888' }}>Searching...</p>
          </div>
        ) : results.length === 0 && query ? (
          <div className="glass fade-in" style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👤</div>
            <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--primary)' }}>No users found</p>
            <p style={{ color: '#888', marginTop: '0.5rem' }}>Try a different search term</p>
          </div>
        ) : (
          results.map((user, index) => (
            <Link to={`/user/${user._id}`} key={user._id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div 
                className="glass fade-in" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  marginBottom: '1rem', 
                  padding: '1.5rem', 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  animationDelay: `${index * 0.1}s`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
              >
                <img 
                  src={`https://ui-avatars.com/api/?name=${user.name}&background=random&size=48`} 
                  alt="avatar" 
                  style={{ 
                    borderRadius: '50%',
                    border: '2px solid var(--primary)',
                    boxShadow: 'var(--shadow-sm)'
                  }} 
                />
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 700, fontSize: '1.1rem', display: 'block' }}>{user.name}</span>
                  <span style={{ color: '#888', fontSize: '0.9rem' }}>{user.email}</span>
                </div>
                <span style={{ fontSize: '1.5rem' }}>→</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
export default Search;
