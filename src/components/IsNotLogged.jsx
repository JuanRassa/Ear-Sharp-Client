import React, { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate } from 'react-router-dom';
const IsNotLogged = props => {
  const {
    loadingContext: { isLoading },
    loggedContext: { isLoggedIn },
    authenticateUser
  } = useContext(AuthContext);
  authenticateUser()
  if (isLoading) {
    <p>Loading...</p>;
  }
  if (!isLoggedIn) {
    return props.children;
  } else {
    return <Navigate to={'/'} />;
  }
};

export default IsNotLogged;
