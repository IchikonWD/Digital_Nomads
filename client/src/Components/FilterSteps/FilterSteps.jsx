import React from 'react';
import { Link } from 'react-router-dom';

const FilterSteps = ({ step1, step2 }) => {
  return (
    <div className='infoSteps'>
      {step1 ? (
        <Link to='/infostep3'>
          <i className='fas fa-circle'></i>
        </Link>
      ) : (
        <Link to='/infostep2'>
          <i className='far fa-circle'></i>
        </Link>
      )}
      {step2 ? (
        <Link to='/infostep2'>
          <i className='fas fa-circle'></i>
        </Link>
      ) : (
        <Link to='/infostep3'>
          <i className='far fa-circle'></i>
        </Link>
      )}
    </div>
  );
};

export default FilterSteps;
