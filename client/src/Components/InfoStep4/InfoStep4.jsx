import React from 'react';
import { Link } from 'react-router-dom';

const InfoStep4 = () => {
  return (
    <div className='info-step4'>
      <h3> We've found some fellows around with the same interests</h3>
      <p> You can always change your interests in your profile</p>
      <button> Chat Nomads</button>
      <Link to='/'>Maybe later</Link>
    </div>
  );
};

export default InfoStep4;
