import React, { useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';
import SkeletonLoader from '../components/SkeletonLoader';

const Designer = () => {
  const { user } = useContext(AuthContext);
  const { addToast } = useContext(ToastContext);
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!image) {
      addToast('Please select an image', 'error');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('caption', caption);
      formData.append('image', image);
      const { data } = await api.post('/flyers', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${user.token}` }
      });
      addToast('Flyer posted successfully! 🎉', 'success');
      setCaption('');
      setImage(null);
      setPreview(null);
      // Reset file input
      e.target.reset();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to post flyer', 'error');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 1100, margin: '2rem auto', padding: '0 1rem' }}>
      <div className="glass fade-in" style={{ padding: '2rem' }}>
        <h2 style={{ 
          textAlign: 'center', 
          fontWeight: 800, 
          marginBottom: '2rem',
          fontSize: '2rem',
          background: 'var(--gradient-primary)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          ✨ Create a Flyer
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          <div style={{ order: 2 }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.75rem', 
                  fontWeight: 600,
                  fontSize: '1.05rem'
                }}>
                  📷 Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ 
                    padding: '0.75rem', 
                    borderRadius: '16px', 
                    border: '2px dashed rgba(0,0,0,0.2)', 
                    background: 'rgba(255,255,255,0.7)',
                    width: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.75rem', 
                  fontWeight: 600,
                  fontSize: '1.05rem'
                }}>
                  💬 Caption (Optional)
                </label>
                <textarea
                  placeholder="What's on your mind? Add a caption to your flyer..."
                  value={caption}
                  onChange={e => setCaption(e.target.value)}
                  rows={6}
                  style={{ 
                    padding: '1rem', 
                    borderRadius: '16px', 
                    border: '1px solid rgba(0,0,0,0.1)', 
                    fontSize: '1rem', 
                    background: 'rgba(255,255,255,0.7)',
                    width: '100%',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>
              <button 
                type="submit" 
                disabled={loading || !image} 
                className="btn-primary"
                aria-label="Post your flyer"
                style={{ 
                  padding: '1rem',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  marginTop: '0.5rem',
                  opacity: (!image || loading) ? 0.6 : 1,
                  cursor: (!image || loading) ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
                    Posting...
                  </span>
                ) : (
                  '🚀 Post Flyer'
                )}
              </button>
            </form>
          </div>
          <div style={{ order: 1 }}>
            {preview ? (
              <div className="fade-in" style={{ 
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)'
              }}>
                <img 
                  src={preview} 
                  alt="Preview of your flyer"
                  loading="lazy"
                  style={{ 
                    width: '100%', 
                    display: 'block',
                    maxHeight: '600px',
                    objectFit: 'contain',
                    background: 'rgba(0,0,0,0.03)'
                  }} 
                />
              </div>
            ) : (
              <div className="fade-in" style={{ 
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                color: '#888',
                border: '2px dashed rgba(0,0,0,0.1)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🖼️</div>
                <div>Image preview will appear here</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media (min-width: 900px) {
          .glass.fade-in > div { grid-template-columns: 1fr 1fr; display: grid; gap: 2rem; }
          .glass.fade-in > div > div:first-child { order: 1; }
          .glass.fade-in > div > div:last-child { order: 2; }
        }
      `}</style>
    </div>
  );
};

export default Designer;
