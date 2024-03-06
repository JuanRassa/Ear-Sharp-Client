import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate } from 'react-router-dom';

const IsPrivate = props => {
  const {
    loadingContext: { isLoading },
    loggedContext: { isLoggedIn },
  } = useContext(AuthContext);
  if (isLoading) {
    <p>Loading...</p>;
  }
  if (!isLoggedIn) {
    return <Navigate to={'/login'} />;
  } else {
    return props.children;
  }
};

export default IsPrivate;
