import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import SkeletonLoader from '../components/SkeletonLoader';
import { AuthContext } from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';

const Feed = () => {
  const { user } = useContext(AuthContext);
  const { addToast } = useContext(ToastContext);
  const [flyers, setFlyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch flyers from backend
    const fetchFlyers = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/flyers');
        setFlyers(data);
      } catch (err) {
        setFlyers([]);
        addToast('Failed to load flyers', 'error');
      }
      setLoading(false);
    };
    fetchFlyers();
  }, [addToast]);

  const handleDownload = async (flyer) => {
    try {
      const { data } = await api.post(`/flyers/${flyer._id}/download`, {}, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const filename = flyer.imageUrl.split('/').pop();
      const link = document.createElement('a');
      link.href = data.downloadUrl;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setFlyers(prev => prev.map(f => f._id === flyer._id ? { ...f, downloads: data.downloads } : f));
      addToast('Your free download is on the way! 🎁', 'success');
    } catch (err) {
      addToast('Unable to download this flyer right now', 'error');
    }
  };

  const handlePurchase = async (flyer) => {
    try {
      const { data } = await api.post(`/flyers/${flyer._id}/purchase`, {}, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setFlyers(prev => prev.map(f => f._id === flyer._id ? { ...f, purchases: data.purchases } : f));
      addToast('Purchase confirmed! Thanks for supporting this creator ✨', 'success');
    } catch (err) {
      addToast('Purchase could not be completed right now', 'error');
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: '2rem auto' }}>
      <h2 style={{ 
        textAlign: 'center', 
        fontWeight: 800, 
        marginBottom: '2rem',
        fontSize: '2rem',
        background: 'var(--gradient-primary)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        🎨 Flyer Feed
      </h2>
      {loading ? (
        <SkeletonLoader height={180} />
      ) : flyers.length === 0 ? (
        <div className="glass fade-in" style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎨</div>
          <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--primary)' }}>No flyers yet. Be the first to post!</p>
        </div>
      ) : (
        <div className="feed-grid">
          {flyers.map((flyer, index) => (
            <div key={flyer._id} className="glass fade-in card" style={{ 
              padding: '1.2rem', 
              position: 'relative',
              animationDelay: `${index * 0.05}s`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                <img 
                  src={`https://ui-avatars.com/api/?name=${flyer.authorName}&background=random&size=40`} 
                  alt="avatar" 
                  style={{ 
                    borderRadius: '50%', 
                    border: '2px solid var(--primary)',
                    boxShadow: 'var(--shadow-sm)'
                  }} 
                />
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 700, fontSize: '1rem', display: 'block' }}>{flyer.authorName}</span>
                  <span style={{ color: '#b3c4ff', fontSize: '0.8rem' }}>{new Date(flyer.createdAt).toLocaleString()}</span>
                </div>
              </div>
              <div style={{ margin: '0.75rem 0' }}>
                <img 
                  src={`http://localhost:5000${flyer.imageUrl}`} 
                  alt={`Flyer by ${flyer.authorName}${flyer.caption ? ` — ${flyer.caption}` : ''}`} 
                  className="img-zoom"
                  loading="lazy"
                  style={{ 
                    width: '100%', 
                    borderRadius: '16px', 
                    boxShadow: 'var(--shadow-md)'
                  }}
                />
                {flyer.caption && (
                  <p style={{ 
                    marginTop: '0.75rem', 
                    fontWeight: 500, 
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    color: 'inherit'
                  }}>
                    {flyer.caption}
                  </p>
                )}
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                gap: '1rem', 
                marginTop: '0.5rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid rgba(83,240,255,0.15)'
              }}>
                <button
                  aria-label={flyer.likedBy?.includes(user?._id) ? 'Unlike flyer' : 'Like flyer'}
                  title={flyer.likedBy?.includes(user?._id) ? 'Unlike' : 'Like'}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer', 
                    fontSize: '1.2rem', 
                    color: flyer.likedBy?.includes(user?._id) ? 'var(--accent)' : '#8ea6ff',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.4rem 0.6rem',
                    borderRadius: '12px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(31, 77, 216, 0.18)';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.transform = 'scale(1)';
                  }}
                  onClick={async () => {
                    try {
                      const { data } = await api.post(`/flyers/${flyer._id}/like`, {}, {
                        headers: { Authorization: `Bearer ${user.token}` }
                      });
                      setFlyers(flyers => flyers.map(f => f._id === flyer._id ? { ...f, likes: data.likes, likedBy: data.likedBy } : f));
                      addToast(flyer.likedBy?.includes(user?._id) ? 'Unliked' : 'Liked!', 'success');
                    } catch {
                      addToast('Failed to like flyer', 'error');
                    }
                  }}
                >
                  {flyer.likedBy?.includes(user?._id) ? '💙' : '🤍'} 
                  <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{flyer.likes || 0}</span>
                </button>
                <span style={{ 
                  fontSize: '1rem', 
                  color: '#8ea6ff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}>
                  💬 <span style={{ fontWeight: 600 }}>{flyer.comments?.length || 0}</span>
                </span>
              </div>
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '0.75rem'
              }}>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    type="button"
                    className="btn-primary"
                    aria-label="Buy this flyer"
                    title="Buy this flyer"
                    onClick={() => handlePurchase(flyer)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    🛍️ Buy Now
                  </button>
                  <button
                    type="button"
                    className="btn-outline"
                    aria-label="Download this flyer for free"
                    title="Download for free"
                    onClick={() => handleDownload(flyer)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    ⬇️ Get for Free
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="tag">🛒 {flyer.purchases || 0} purchases</span>
                  <span className="tag">📥 {flyer.downloads || 0} downloads</span>
                </div>
              </div>
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(83,240,255,0.15)' }}>
                <form
                  onSubmit={async e => {
                    e.preventDefault();
                    const text = e.target.comment.value;
                    if (!text) return;
                    try {
                      const { data } = await api.post(`/flyers/${flyer._id}/comment`, { text }, {
                        headers: { Authorization: `Bearer ${user.token}` }
                      });
                      setFlyers(flyers => flyers.map(f => f._id === flyer._id ? { ...f, comments: data } : f));
                      e.target.reset();
                      addToast('Comment added!', 'success');
                    } catch {
                      addToast('Failed to add comment', 'error');
                    }
                  }}
                  style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}
                >
                  <input 
                    name="comment" 
                    placeholder="Add a comment..." 
                    style={{ 
                      flex: 1, 
                      padding: '0.75rem 1rem', 
                      borderRadius: '16px', 
                      border: '1px solid rgba(83,240,255,0.25)',
                      background: 'rgba(10, 28, 66, 0.9)',
                      color: '#e4edff',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease'
                    }} 
                  />
                  <button 
                    type="submit" 
                    className="btn-primary"
                    style={{ 
                      padding: '0.75rem 1.5rem',
                      fontSize: '0.95rem'
                    }}
                  >
                    Post
                  </button>
                </form>
                <div style={{ marginTop: '1rem' }}>
                  {flyer.comments?.map((c, idx) => (
                    <div 
                      key={idx} 
                      className="fade-in"
                      style={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: '0.75rem', 
                        marginBottom: '1rem',
                        padding: '0.75rem',
                        background: 'rgba(12, 35, 80, 0.35)',
                        borderRadius: '12px'
                      }}
                    >
                      <img 
                        src={`https://ui-avatars.com/api/?name=User&background=random&size=32`} 
                        alt="avatar" 
                        style={{ 
                          borderRadius: '50%',
                          border: '1px solid rgba(83,240,255,0.25)'
                        }} 
                      />
                      <div style={{ flex: 1 }}>
                        <span style={{ fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>{c.text}</span>
                        <span style={{ color: '#8ea6ff', fontSize: '0.8rem' }}>
                          {new Date(c.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
