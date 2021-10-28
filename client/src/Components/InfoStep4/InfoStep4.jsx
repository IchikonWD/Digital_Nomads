import React from 'react';
import { Link } from 'react-router-dom';

const InfoStep4 = ({ history }) => {
  const handleButton = async (e) => {
    e.preventDefault();
    history.push('/');
  };
  return (
    <div className='info-step4'>
      <header className='user_profile_editing__header'>
        <i className='fas fa-chevron-left user_profile_editing__header__icon loginarrow'>
          <button className='hidden_button' onClick={handleButton}></button>
        </i>
      </header>
      <img
        className='register2image'
        src='/assets/images/register2vector.png'
        alt=''
      />
      <img
        className='info4mountain'
        src='/assets/images/info4mountain.png'
        alt=''
      />
      <h3 className='infotitle'>
        {' '}
        We've found some fellows around with the same interests
      </h3>
      <p className='infotext'>
        {' '}
        You can always change your <br />
        preferences in your profile
      </p>
      <button className='primary_button info4button'> Chat Nomads</button>
      <Link className='infotext4' to='/'>
        Maybe later
      </Link>
    </div>
  );
};

export default InfoStep4;
