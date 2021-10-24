import React from 'react';

const ErrorNoResults = () => {
  return (
    <div className='error-noResults'>
      <h2>Your suggested nomad places are empty so far...</h2>
      <img
        src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-cat-photos-1593441022.jpg?crop=0.669xw:1.00xh;0.166xw,0&resize=640:*'
        alt='404'
      />
      <h2>Please, try again</h2>
      <Link to='/explore1'>
        <button>Go Back Home </button>
      </Link>
    </div>
  );
};

export default ErrorNoResults;
