import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './index.css';
import Home from './components/Home';
import Layout from './Layout';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';
import Landing from './components/Landing';
import Help from './components/NavComponents/Help';
import Health from './components/NavComponents/Health';
import Support from './components/NavComponents/Support';
import Video from './components/NavComponents/Video';
import Mood from './components/NavComponents/Mood';
import Task from './components/NavComponents/Task';
import News from './components/NavComponents/News';
import ErrorBoundary from "./ErrorBoundary";


const App = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user session
    setUser(null); // Reset state
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={user ? <Navigate to="/home" /> : <Navigate to="/landing" />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/home" element={user ? <Home onLogout={handleLogout} /> : <Navigate to="/landing" />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/help" element={user ? <Help /> : <Navigate to="/landing" />} />
          <Route path="/health" element={user ? <Health username={user.username} /> : <Navigate to="/landing" />} />
          <Route path="/support" element={user ? <ErrorBoundary><Support /></ErrorBoundary> : <Navigate to="/landing" />} />
          <Route path="/video" element={user ? <Video /> : <Navigate to="/landing" />} />
          <Route path="/mood" element={user ? <Mood username={user.username} /> : <Navigate to="/landing" />} />
          <Route path="/news" element={user ? <News username={user.username} /> : <Navigate to="/landing" />} />
          <Route path="/tasks" element={user ? <Task username={user.username} /> : <Navigate to="/landing" />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
