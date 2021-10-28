import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CityContext } from '../../Contexts/cityContext';
import { UserContext } from '../../Contexts/userContext';

const InfoStep1 = ({ history }) => {
  const { user } = useContext(UserContext);
  const { city, setCity } = useContext(CityContext);
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);

  // Redirect to home if user is not logged in
  useEffect(() => {
    if (user.isLoggedIn === false) {
      history.push('/');
    }
  }, [user, history]);

  // Get all cities from database
  useEffect(() => {
    async function fetchCities() {
      try {
        const url = 'http://localhost:5000/api/data/';
        const res = await axios.get(url);
        if (res.data) {
          setCities(res.data);
        } else {
          console.log('No data found');
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchCities();
  }, [setCities]);

  // Get selected city from input field and set it to state
  useEffect(() => {
    if (selectedCity) {
      setCity(selectedCity);
    }
    if (selectedCity !== '') {
      localStorage.setItem('city', JSON.stringify(selectedCity));
    }
  }, [selectedCity, setCity, city]);

  // Handle input change
  const handleChange = (e) => {
    e.preventDefault();
    setSelectedCity(e.target.value);
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/infostep2');
  };

  return (
    <div className='info-step1'>
      <img
        className='register2image'
        src='/assets/images/register2vector.png'
        alt=''
      />
      <img
        className='register2logo'
        src='/assets/images/logoregister2.png'
        alt='logo'
      />
      <h3 className='register2title infostep1title'>
        Do you want to meet other digital nomads of your next destination?
      </h3>

      <form onSubmit={handleSubmit}>
        <select
          className='register3input4 infostep1input'
          name='city'
          id='city'
          onChange={handleChange}
        >
          <option value=''>Select a city</option>
          {cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
        {selectedCity !== '' ? (
          <button className='primary_button infostep1button'>Sure!</button>
        ) : (
          <button
            className='primary_button_disabled infostep1button'
            type='submit'
            disabled
          >
            Sure!
          </button>
        )}
      </form>
      <Link className='interests_close infostepclose' to='/'>
        {' '}
        Skip{' '}
      </Link>
    </div>
  );
};

export default InfoStep1;
