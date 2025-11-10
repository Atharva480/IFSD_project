import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';

const UserProfile = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { addToast } = useContext(ToastContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/auth/users/search?name=`);
        const found = data.find(u => u._id === id);
        setProfile(found);
        setFollowed(found?.followers?.includes(user?._id));
      } catch {
        setProfile(null);
        addToast('Failed to load profile', 'error');
      }
      setLoading(false);
    };
    fetchProfile();
  }, [id, user?._id, addToast]);

  const handleFollow = async () => {
    try {
      await api.post(`/auth/users/${id}/follow`, {}, { headers: { Authorization: `Bearer ${user.token}` } });
      setFollowed(true);
      addToast('Following user!', 'success');
    } catch {
      addToast('Failed to follow user', 'error');
    }
  };
  
  const handleUnfollow = async () => {
    try {
      await api.post(`/auth/users/${id}/unfollow`, {}, { headers: { Authorization: `Bearer ${user.token}` } });
      setFollowed(false);
      addToast('Unfollowed user', 'info');
    } catch {
      addToast('Failed to unfollow user', 'error');
    }
  };

  if (loading) {
    return (
      <div className="glass fade-in" style={{ maxWidth: 500, margin: '2rem auto', textAlign: 'center', padding: '3rem' }}>
        <div className="spinner" style={{ margin: '0 auto', width: '50px', height: '50px' }}></div>
        <p style={{ marginTop: '1rem', color: '#888' }}>Loading profile...</p>
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="glass fade-in" style={{ maxWidth: 500, margin: '2rem auto', textAlign: 'center', padding: '3rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😕</div>
        <h2 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>User not found</h2>
        <p style={{ color: '#888' }}>The user you're looking for doesn't exist</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <div className="glass fade-in" style={{ textAlign: 'center', padding: '2.5rem' }}>
        <img 
          src={`https://ui-avatars.com/api/?name=${profile.name}&background=random&size=120`} 
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
          {profile.name}
        </h2>
        <p style={{ color: 'var(--secondary)', fontSize: '1.1rem', fontWeight: 500, marginBottom: '2rem' }}>
          {profile.email}
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
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>
              {profile.followers?.length || 0}
            </div>
            <div style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.25rem' }}>Followers</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--secondary)' }}>
              {profile.following?.length || 0}
            </div>
            <div style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.25rem' }}>Following</div>
          </div>
        </div>
        {user?._id !== profile._id && (
          <div style={{ marginTop: '2rem' }}>
            {followed ? (
              <button 
                onClick={handleUnfollow} 
                className="btn-secondary"
                style={{ 
                  padding: '0.75rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: 700
                }}
              >
                ✓ Following
              </button>
            ) : (
              <button 
                onClick={handleFollow} 
                className="btn-primary"
                style={{ 
                  padding: '0.75rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: 700
                }}
              >
                + Follow
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
