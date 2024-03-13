import { createContext, useState } from 'react';
import { verify } from '../api/auth.api';

export const AuthContext = createContext();

export const AuthProviderWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  // console.log('isLoggedIn', isLoggedIn);
  // console.log("USER INFO", user)

  const storeToken = token => {
    localStorage.setItem('authToken', token);
  };

  const retrieveToken = () => {
    return localStorage.getItem("authToken")
  }

  const authenticateUser = async () => {
    const storedToken = localStorage.getItem('authToken');
    console.log("storedToken", storedToken)
    if (storedToken) {
      try {
        const response = await verify(storedToken);
        console.log("authenticateUser RESPONSE", response)
        const user = response.data;
        setUser(user);
        setIsLoggedIn(true);
      } catch (error) {
        console.log('An error occured authenticating the user: ', error);
        setUser(null);
        setIsLoggedIn(false);
      }
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  };

  const removeToken = () => {
    localStorage.removeItem('authToken');
  };

  const logoutUser = () => {
    removeToken();
    authenticateUser();
  };

  return (
    <AuthContext.Provider
      value={{
        loadingContext: { isLoading, setIsLoading },
        loggedContext: { isLoggedIn, setIsLoggedIn },
        userContext: { user, setUser },
        storeToken,
        retrieveToken,
        authenticateUser,
        logoutUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
