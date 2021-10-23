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

  const handleButton = () => {
    history.push('/registerstep3');
  };

  return (
    <div className='register2'>
      {name === '' ? (
        <h2>You're not supposed to be seeing this</h2>
      ) : (
        <h2>Welcome {name}</h2>
      )}
      <p>
        In order to guide your first steps and personalize you experience, we
        have a couple of questions for you
      </p>
      <button onClick={handleButton}>Next</button>
    </div>
  );
};

export default RegisterStep2;
