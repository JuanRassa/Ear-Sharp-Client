import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../api/auth.api';

const Signup = () => {
  const [name, setName] = useState('');
  const [last_name, setLast_name] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('')
  const [organization_admin_id, setOrganization_admin_id] = useState(null)
  const is_super_admin = false
  const exercises_progress = []
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const user = { 
      name,
      last_name,
      username,
      email, 
      password,
      role,
      organization_admin_id,
      exercises_progress,
    };
    try {
      await signup(user);
      navigate('/register-confirmation');
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
        <label htmlFor='last_name'>Last Name</label>
        <input
          type='last_name'
          name='last_name'
          id='last_name'
          value={last_name}
          onChange={e => {
            setLast_name(e.target.value);
          }}
        />
        <label htmlFor='username'>Username</label>
        <input
          type='username'
          name='username'
          id='username'
          value={username}
          onChange={e => {
            setUsername(e.target.value);
          }}
        />
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
          autoComplete='password'
          name='password'
          id='password'
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        <h2>YOUR ROLE</h2>
        <label htmlFor='OrganizationAdmin'>OrganizationAdmin</label>
        <input 
          type='radio' 
          id='OrganizationAdmin' 
          name='role' 
          value="OrganizationAdmin"
          onChange={() => {
            setRole("OrganizationAdmin")
          }}
        />
        <label htmlFor='is_teacher'>Teacher</label>
        <input 
          type='radio' 
          id='Teacher' 
          name='role' 
          value="Teacher"
          onChange={() => {
            setRole("Teacher")
          }}
        />
        <label htmlFor='Student'>Student</label>
        <input 
          type='radio' 
          id='Student' 
          name='role' 
          value="Student"
          onChange={() => {
            setRole("Student")
          }}
        />
        <label htmlFor='Solo'>Solo</label>
        <input 
          type='radio' 
          id='Solo' 
          name='role' 
          value="Solo"
          onChange={() => {
            setRole("Solo")
          }}
        />
        {role === "OrganizationAdmin" && 
          (
            <div>
              <label htmlFor='last_name'>Indicate the ID of your Organization</label>
              <input
              type='organization_admin_id'
              name='organization_admin_id'
              id='organization_admin_id'
              value={organization_admin_id}
              onChange={e => {
                setOrganization_admin_id(e.target.value);
              }}
              />
            </div>
          )
        }
        <hr></hr>
        <button type='submit'>Sign Up</button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {/* <p>Already have an account?</p> */}
      {/* <Link to='/login'>Login</Link> */}
    </div>
  );
};

export default Signup;
