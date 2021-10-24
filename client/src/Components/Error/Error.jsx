import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className='404'>
      <h2>Oh no... even us we don't know where are we going...</h2>
      <img
        src='https://www.trecebits.com/wp-content/uploads/2020/11/Error-404.jpg'
        alt='404'
      />
      <h2>So Sorry, we've lost the link</h2>
      <Link to='/'>
        <button>Go Back Home </button>
      </Link>
    </div>
  );
};

export default Error;
