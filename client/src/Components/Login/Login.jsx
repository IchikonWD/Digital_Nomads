import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Contexts/userContext';
import axios from 'axios';

const Login = ({ history }) => {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [loginInfo, setLoginInfo] = useState('');

  // Change visibility of password
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (user.isLoggedIn === true) {
      history.push('/');
    }
  }, [user, history]);

  // Post login info to server
  useEffect(() => {
    async function fetchData() {
      if (loginInfo.email && loginInfo.password) {
        const { email, password } = loginInfo;
        try {
          const url = '/api/users/login/';
          const res = await axios.post(url, {
            email: email,
            password: password,
          });
          if (res.data) {
            setUser({
              isLoggedIn: true,
              _id: res.data._id,
              name: res.data.name,
              email: res.data.email,
              age: res.data.age,
              language: res.data.language,
              ocupation: res.data.ocupation,
              country: res.data.country,
              avatar: res.data.avatar,
              token: res.data.token,
            });
            //Save user to localStorage
            localStorage.setItem(
              'user',
              JSON.stringify({
                isLoggedIn: true,
                _id: res.data._id,
                name: res.data.name,
                email: res.data.email,
                age: res.data.age,
                language: res.data.language,
                ocupation: res.data.ocupation,
                country: res.data.country,
                avatar: res.data.avatar,
                token: res.data.token,
              })
            );
            setLoginInfo({});
          } else {
            setLoginInfo({});
          }
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
    }
    fetchData();
  }, [loginInfo, setUser]);

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      const userData = {
        email,
        password,
      };
      setLoginInfo(userData);
    } else {
      alert('Please fill in all fields');
    }
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
