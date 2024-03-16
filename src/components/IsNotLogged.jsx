import React, { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate } from 'react-router-dom';
const IsNotLogged = props => {
  const {
    loadingContext: { isLoading },
    loggedContext: { isLoggedIn },
    userContext: { user },
    authenticateUser
  } = useContext(AuthContext);
  authenticateUser()
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (!isLoggedIn) {
    return props.children;
  } else {
    if (user.role === "SuperAdmin") return <Navigate to={'/admin'} />;
    else if (user.role === "OrganizationAdmin") return <Navigate to={'/organization-portal/1'} />;
    else if (user.role === "Teacher") return <Navigate to={'/teacher-portal'} />;
    else if (user.role === "Student") return <Navigate to={'/student-portal'} />;
    else if (user.role === "Solo") return <Navigate to={'/my-portal'} />;
    else return <Navigate to={"/"} />
  }
};

export default IsNotLogged;
