import React, { useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const { addToast } = useContext(ToastContext);
  const navigate = useNavigate();
  
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      setUser(data);
      addToast('Welcome back! 🎉', 'success');
      navigate('/feed');
    } catch (err) {
      addToast(err.response?.data?.message || 'Login failed', 'error');
    }
    setLoading(false);
  };
  
  return (
    <div className="glass fade-in" style={{ maxWidth: 450, margin: '2rem auto', padding: '2.5rem' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2972/2972065.png"
            alt="Flyer design illustration"
            style={{ width: '72px', height: '72px', marginBottom: '0.5rem' }}
          />
          <h2 style={{ 
            fontWeight: 800, 
            margin: 0,
            fontSize: '2rem',
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Welcome
          </h2>
          <p style={{ color: 'var(--secondary)', fontWeight: 500, margin: '0.5rem 0 0', fontSize: '1.05rem' }}>
            Sign in to craft and share your standout flyers
          </p>
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
            placeholder="Enter your password" 
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
              Logging in...
            </span>
          ) : (
            '🚀 Login'
          )}
        </button>
        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.95rem' }}>
          New here? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>Create an account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
