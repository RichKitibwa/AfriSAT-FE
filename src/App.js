import logo from './logo.svg';
import LandingPage from './components/LandingPage';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container} from 'react-bootstrap';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import Dashboard from './components/DashBoard';
import Login from './components/Login';
import Logout from './components/Logout';
import AdminDashboard from './components/AdminDashboard';
import './App.css';
import Footer from './components/footer';
import AllCodes from './components/ViewAllCodes';
import AddCodes from './components/AddCodes';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setUsername(username)
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    localStorage.removeItem('jwtToken');
  }

  return (
    <Router>
      <NavBar isAuthenticated={isAuthenticated} username={username} handleLogout={handleLogout} />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp handleLogin={handleLogin} />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />

          {isAuthenticated && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/dashboard/all-codes" element={<AllCodes />} />
              <Route path="/admin/dashboard/add-code" element={<AddCodes />} />
            </>  
          )}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
