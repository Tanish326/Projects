import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './Login.jsx';
import Pipeline from './Pipelines.jsx';
import Dashboard from './Dashboard.jsx';
import Navbar from './Navbar.jsx'
import Register from './Rejister.jsx';
export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const login = (userData, tokenData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', tokenData);
    setUser(userData);
    setToken(tokenData);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      <Router>
        {token && <Navbar />}
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/register" element={!token ? <Register /> : <Navigate to="/pipeline" />} />
            <Route path="/login" element={!token ? <Login /> : <Navigate to="/pipeline" />} />
            <Route path="/pipeline" element={token ? <Pipeline /> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={token && user?.role !== 'Sales_Rep' ? <Dashboard /> : <Navigate to="/pipeline" />} />
            <Route path="*" element={<Navigate to="/register" />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}
export default App;