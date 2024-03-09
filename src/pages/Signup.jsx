import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/auth.api';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const user = { email, password, name };
    try {
      await signup(user);
      navigate('/login');
    } catch (error) {
      console.log('Error signingup: ', error);
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form
        onSubmit={e => {
          handleSubmit(e);
        }}>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          id='email'
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        <label htmlFor='name'>Name</label>
        <input
          type='name'
          name='name'
          id='name'
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
        />
        <button type='submit'>Sign Up</button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <p>Already have an account?</p>
      <Link to='/login'>Login</Link>
    </div>
  );
};

export default Signup;
