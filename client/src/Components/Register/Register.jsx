import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const register = () => {
    axios.post('/api/users/register', {
      name: name,
      email: email,
      password: password,
    });
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      console.log(name, email, password);
    }
  };

  return (
    <div className='register'>
      <h2>Create Account</h2>
      <p>or with your mail</p>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={passwordShown ? 'text' : 'password'}
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{' '}
        <i className='fas fa-eye-slash' onClick={togglePassword}></i>
        <input
          type={confirmPasswordShown ? 'text' : 'password'}
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />{' '}
        <i className='fas fa-eye-slash' onClick={toggleConfirmPassword}></i>
        <input type='checkbox' /> By signing up, you agree to our{' '}
        <Link to='/'>Terms</Link> and that you have read our{' '}
        <Link to='/'>Privacy Policy</Link>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
