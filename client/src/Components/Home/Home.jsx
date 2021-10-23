import React, { useState } from 'react';

const Home = ({ history }) => {
  const [search, setSearch] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <div className='home'>
      <div className='home1'>
        <form onSubmit={submitHandler}>
          <input type='text' name='city' />
          <p>Choose your next destination according to your nomad wantings</p>
          <button>Explore!</button>
        </form>
      </div>
      <div className='home2'>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate,
          cum.
        </p>
        <ul>
          <li>Internet</li>
          <li>Safety</li>
          <li>Places</li>
          <li>Living costs</li>
          <li>Community</li>
          <li>Hobbies</li>
        </ul>
      </div>
      <div className='home3'>
        <p>Best nomad places</p>
        {/* COMPONENTE QUE RENDERICE 9 TARJETAS CON EL TOP RATED */}
      </div>
    </div>
  );
};

export default Home;
