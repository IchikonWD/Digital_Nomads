import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Contexts/userContext';
import axios from 'axios';
import LoginGoogleComp from '../LoginGoogleComp';

const Register = ({ location, history }) => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({});

  // Change visibility of password
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (user.isLoggedIn === true) {
      history.push('/');
    }
  }, [user, history]);

  const handleNext = (e) => {
    e.preventDefault();
    history.push('/registerstep2');
  };
  // Post register info to server
  useEffect(() => {
    async function fetchData() {
      if (registerInfo.name && registerInfo.email && registerInfo.password) {
        const { name, email, password } = registerInfo;
        try {
          const url = 'http://localhost:5000/api/users/';
          const res = await axios.post(url, {
            name: name,
            email: email,
            password: password,
          });
          if (res.data) {
            setUser({
              isLoggedIn: true,
              name: res.data.name,
              email: res.data.email,
              _id: res.data._id,
              token: res.data.token,
            });
            //Save user to localStorage
            localStorage.setItem(
              'user',
              JSON.stringify({
                isLoggedIn: true,
                name: res.data.name,
                email: res.data.email,
                _id: res.data._id,
                token: res.data.token,
              })
            );
            setRegisterInfo({});
            history.push('/registerstep2');
          }
          // else {
          //   setRegisterInfo({});
          // }
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
    }
    fetchData();
  }, [registerInfo, setUser, history]);

  // Button click handler
  const handleGoHome = () => {
    history.push('/');
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const userData = {
          name,
          email,
          password,
        };
        setRegisterInfo(userData);
      } else {
        alert('Passwords do not match');
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <section className='regpage'>
      <a href='/' className='registerclose' onClick={handleGoHome}>
        Close
      </a>
      <h2 className='registertitleacc1'>
        <span>Create Account</span>
      </h2>
      <LoginGoogleComp />
      <hr className='spacerreg1' />
      <p className='registertextmail'>or with your mail</p>
      <hr className='spacerreg2' />
      <form onSubmit={handleSubmit}>
        <img
          className='registertextname'
          src='/assets/images/text_registername.png'
          alt='name'
        />
        <input
          type='text'
          required
          placeholder='Name'
          value={name}
          className='input_register_field1'
          onChange={(e) => setName(e.target.value)}
        />
        <img
          className='registertextemail'
          src='/assets/images/text_registeremail.png'
          alt='email'
        />
        <input
          type='text'
          required
          placeholder='Email'
          value={email}
          className='input_register_field2 '
          onChange={(e) => setEmail(e.target.value)}
        />
        <img
          className='registertextpass1'
          src='/assets/images/text_registerpass1.png'
          alt='pass1'
        />
        <input
          type={passwordShown ? 'text' : 'password'}
          required
          placeholder='Password'
          value={password}
          className='input_register_field3'
          onChange={(e) => setPassword(e.target.value)}
        />{' '}
        {passwordShown ? (
          <i className='fas fa-eye-slash regeye1' onClick={togglePassword}></i>
        ) : (
          <i className='fas fa-eye regeye1' onClick={togglePassword}></i>
        )}
        <img
          className='registertextpass2'
          src='/assets/images/text_registerpass2.png'
          alt='pass2'
        />
        <input
          type={confirmPasswordShown ? 'text' : 'password'}
          required
          placeholder='Confirm Password'
          value={confirmPassword}
          className='input_register_field4'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />{' '}
        {confirmPasswordShown ? (
          <i
            className='fas fa-eye-slash regeye2'
            onClick={toggleConfirmPassword}
          ></i>
        ) : (
          <i className='fas fa-eye regeye2' onClick={toggleConfirmPassword}></i>
        )}
        <div className='container'>
          <div className='round'>
            <input className='checkregister' type='checkbox' id='checkbox' />
            <label htmlFor='checkbox'></label>
          </div>
        </div>
        <p className='checkregistertext'>
          By signing up, you agree to our{' '}
          <span className='highlight'>Terms and Conditions</span> and that you
          have read our <span className='highlight'>Privacy Policy</span>,
          including the <span className='highlight'>Cookies Policy</span>.
        </p>
        <button
          onClick={handleNext}
          className='primary_button registerbutton'
          type='submit'
        >
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default Register;
