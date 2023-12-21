import React, { useEffect } from 'react';
import axios from 'axios';

import { useNavigate, Link } from 'react-router-dom';

const Logout = ({ onLogout }) => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const apiLogoutUrl = `${process.env.REACT_APP_API_BASE_URL}/api/auth/logout`;
      const response = await axios.post(apiLogoutUrl);

      const token = response.data.token;
      const role = response.data.role;

      localStorage.removeItem('jwtToken', token);
      localStorage.removeItem('role', role);

      onLogout();
      navigate('/');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return null;
};

export default Logout;
