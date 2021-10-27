import React from 'react';
import { Link } from 'react-router-dom';

const RatingModal = () => {
  return (
    <div className='reviewModal'>
      <header className='reviewModal__header'>
        <Link to={`/`} className='reviewModal__header__close'>
          Close
        </Link>
      </header>
      <div className='reviewModal__body'>
        <h2 className='reviewModal__body__title'>
          Thanks for your review, it helps other nomads like you!
        </h2>
      </div>
      <img
        className='reviewModal__body__mountain'
        src='/assets/images/montana_ilustracion.png'
        alt='Coral'
      />
    </div>
  );
};

export default RatingModal;
