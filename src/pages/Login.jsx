import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth.api';
import { AuthContext } from '../context/auth.context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await login({ email, password });
      storeToken(response.data.authToken);
      authenticateUser();
      navigate('/');
    } catch (error) {
      console.log('Error loging: ', error);
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <div>
      <h2>Login</h2>
      <form
        onSubmit={e => {
          handleSubmit(e);
        }}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            id='email'
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor='email'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <p>Don't have an account yet?</p>
      <Link to='/signup'>Signup</Link>
    </div>
  );
};

export default Login;
