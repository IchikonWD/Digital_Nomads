import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Contexts/userContext';

const RegisterStep2 = ({ history }) => {
  const { user } = useContext(UserContext);
  const [name, setName] = useState('');

  // Redirect to home if user is not logged in
  useEffect(() => {
    if (user.isLoggedIn === false) {
      history.push('/');
    }
  }, [user, history]);

  // Set Name on change
  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  // use effect split name into first and last name
  useEffect(() => {
    if (name) {
      const nameArray = name.split(' ');
      const firstName = nameArray[0];
      setName(firstName);
    }
  }, [name]);

  const handleButton = () => {
    history.push('/registerstep3');
  };

  return (
    <div className='register2'>
      <img
        className='register2image'
        src='/assets/images/register2vector.png'
        alt=''
      />
      <img
        className='register2logo'
        src='/assets/images/logoregister2.png'
        alt='logo'
      />
      {name === '' ? (
        <h2>You're not supposed to be seeing this</h2>
      ) : (
        <h2 className='register2title'>Hi {name}, Welcome</h2>
      )}
      <p className='register2text'>
        In order to guide your first steps and personalize you experience, we
        have <br /> a few questions for you
      </p>
      <button className='primary_button register2button' onClick={handleButton}>
        Next
      </button>
    </div>
  );
};

export default RegisterStep2;
