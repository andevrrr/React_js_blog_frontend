import React from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (Component) => {
  return (props) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    if (!token) {
      navigate('/login');
      return null; // Return null or some loading indicator while navigating
    }

    return <Component {...props} />;
  };
};

export default withAuth;
