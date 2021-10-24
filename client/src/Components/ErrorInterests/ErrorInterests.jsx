import React from 'react';
import { Link } from 'react-router-dom';

const ErrorInterests = () => {
  return (
    <div className='error-interests'>
      <h2>Please fill your interests in your Profile to be in a Group Chat</h2>
      <Link to='/profile'>
        <button>Go to Profile</button>
      </Link>
    </div>
  );
};

export default ErrorInterests;
