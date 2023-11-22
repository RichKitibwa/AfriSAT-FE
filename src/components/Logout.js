import React, { useEffect } from 'react';
import axios from 'axios';

import { useNavigate, Link } from 'react-router-dom';

const Logout = ({ onLogout }) => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/auth/logout');

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
