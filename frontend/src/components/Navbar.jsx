import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { ToastContext } from '../context/ToastContext';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const { addToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
    addToast('Logged out successfully', 'info');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navLinkStyle = (path) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    fontWeight: isActive(path) ? 700 : 500,
    color: isActive(path) ? 'var(--primary)' : 'inherit',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    background: isActive(path) ? 'rgba(31, 77, 216, 0.18)' : 'transparent',
    position: 'relative'
  });

  const iconStyle = { width: '22px', height: '22px' };

  return (
    <>
      <nav className="glass fade-in nav">
        <Link to="/feed" className="brand" style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff' }}>
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/paint-palette.png"
            alt="Palette icon"
            style={{ width: '28px', height: '28px' }}
          />
          <span>ATH Flyer</span>
        </Link>
        <div className="links">
          <Link to="/search" style={navLinkStyle('/search')}>
            <img src="https://img.icons8.com/ios-filled/50/ffffff/search--v1.png" alt="Search" style={iconStyle} />
            <span>Search</span>
          </Link>
          <Link to="/feed" style={navLinkStyle('/feed')}>
            <img src="https://img.icons8.com/ios-filled/50/ffffff/activity-feed-2.png" alt="Feed" style={iconStyle} />
            <span>Feed</span>
          </Link>
          <Link to="/designer" style={navLinkStyle('/designer')}>
            <img src="https://img.icons8.com/ios-filled/50/ffffff/add-file.png" alt="Create" style={iconStyle} />
            <span>Create</span>
          </Link>
          <Link to="/profile" style={navLinkStyle('/profile')}>
            <img src="https://img.icons8.com/ios-filled/50/ffffff/user-male-circle.png" alt="Profile" style={iconStyle} />
            <span>Profile</span>
          </Link>
          {user && (
            <button 
              onClick={handleLogout} 
              className="btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 1rem',
                fontSize: '0.9rem',
                marginLeft: '0.5rem'
              }}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
      <button
        className="theme-toggle"
        aria-label="Toggle theme"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </>
  );
};

export default Navbar;
