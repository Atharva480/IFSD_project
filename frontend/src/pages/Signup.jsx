import React, { useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const { addToast } = useContext(ToastContext);
  const navigate = useNavigate();
  
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/signup', form);
      setUser(data);
      addToast('Account created successfully! 🎉', 'success');
      navigate('/feed');
    } catch (err) {
      addToast(err.response?.data?.message || 'Signup failed', 'error');
    }
    setLoading(false);
  };
  
  return (
    <div className="glass fade-in" style={{ maxWidth: 450, margin: '2rem auto', padding: '2.5rem' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>✨</div>
          <h2 style={{ 
            fontWeight: 800, 
            margin: 0,
            fontSize: '2rem',
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Create Account
          </h2>
          <p style={{ color: 'var(--secondary)', fontWeight: 500, margin: '0.5rem 0 0', fontSize: '1.05rem' }}>
            Design & share stunning flyers!
          </p>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>👤 Name</label>
          <input 
            name="name" 
            placeholder="Enter your name" 
            value={form.name} 
            onChange={handleChange} 
            required 
            style={{ 
              padding: '1rem', 
              borderRadius: '16px', 
              border: '1px solid rgba(0,0,0,0.12)', 
              fontSize: '1rem', 
              background: '#ffffff',
              color: '#0a1733',
              width: '100%',
              transition: 'all 0.3s ease'
            }} 
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>📧 Email</label>
          <input 
            name="email" 
            type="email" 
            placeholder="Enter your email" 
            value={form.email} 
            onChange={handleChange} 
            required 
            style={{ 
              padding: '1rem', 
              borderRadius: '16px', 
              border: '1px solid rgba(0,0,0,0.12)', 
              fontSize: '1rem', 
              background: '#ffffff',
              color: '#0a1733',
              width: '100%',
              transition: 'all 0.3s ease'
            }} 
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>🔒 Password</label>
          <input 
            name="password" 
            type="password" 
            placeholder="Create a password" 
            value={form.password} 
            onChange={handleChange} 
            required 
            style={{ 
              padding: '1rem', 
              borderRadius: '16px', 
              border: '1px solid rgba(0,0,0,0.12)', 
              fontSize: '1rem', 
              background: '#ffffff',
              color: '#0a1733',
              width: '100%',
              transition: 'all 0.3s ease'
            }} 
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="btn-primary"
          style={{ 
            padding: '1rem',
            fontSize: '1.1rem',
            fontWeight: 700,
            marginTop: '0.5rem',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
              Creating...
            </span>
          ) : (
            '🚀 Sign Up'
          )}
        </button>
        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.95rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
