import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate } from 'react-router-dom';

const IsLogged = props => {
  const {
    loadingContext: { isLoading },
    loggedContext: { isLoggedIn },
  } = useContext(AuthContext);
  if (isLoading) {
    <p>Loading...</p>;
  }
  if (isLoggedIn) {
    return props.children;
  } else {
    return <Navigate to={'/authenticate'} />;
  }
};

export default IsLogged;
