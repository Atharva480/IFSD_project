import Navbar from './components/Navbar';
import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile';
import Search from './pages/Search';
import Designer from './pages/Designer';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeContext } from './context/ThemeContext';

function App() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <>
      <Navbar />
      <div style={{ minHeight: '80vh', maxWidth: 700, margin: '2rem auto', padding: '0 1rem' }}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/user/:id" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
          <Route path="/designer" element={<ProtectedRoute><Designer /></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
}
export default App;
