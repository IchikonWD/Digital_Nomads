import React, { useContext } from 'react';
import { DataContext } from '../../Contexts/dataContext';

const Home = ({ history }) => {
  const {data, setData} = useContext(DataContext);
  const submitHandler = (e) => {
    e.preventDefault();
    setData(e.target.city.value)
    history.push(`/map/${e.target.city.value}`)
    console.log(data);
    console.log(e.target.city.value)

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
