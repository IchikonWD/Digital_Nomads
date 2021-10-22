import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Contexts/userContext';
import axios from 'axios';

const Login = ({ history }) => {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

  // Change visibility of password
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    if (user.userInfo) {
      history.push('/');
    }
  }, [user, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          required
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={passwordShown ? 'text' : 'password'}
          required
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <i className='fas fa-eye-slash' onClick={togglePassword}></i>
        <button type='submit'>Sign In</button>
      </form>
    </div>
  );
};

export default Login;
