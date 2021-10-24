import React from 'react';

const InfoSteps = ({ step1, step2 }) => {
  return (
    <div className='infoSteps'>
      {step1 ? (
        <i className='fas fa-circle'></i>
      ) : (
        <i className='far fa-circle'></i>
      )}
      {step2 ? (
        <i className='fas fa-circle'></i>
      ) : (
        <i className='far fa-circle'></i>
      )}
    </div>
  );
};

export default InfoSteps;
