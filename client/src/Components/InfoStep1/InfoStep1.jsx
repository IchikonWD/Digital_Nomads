import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CityContext } from '../../Contexts/cityContext';

const InfoStep1 = () => {
  const { city, setCity } = useContext(CityContext);
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);

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

  useEffect(() => {
    if (selectedCity) {
      setCity(selectedCity);
    }
    if (selectedCity !== '') {
      localStorage.setItem('city', JSON.stringify(selectedCity));
    }
  }, [selectedCity, setCity]);

  const handleChange = (e) => {
    e.preventDefault();
    setSelectedCity(e.target.value);
  };

  return (
    <div>
      <h3>
        Do you want to meet other digital nomads of your next destination?
      </h3>

      <form>
        <select name='city' id='city' onChange={handleChange}>
          <option value=''>Select a city</option>
          {cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
        {selectedCity !== '' ? (
          <button>Sure!</button>
        ) : (
          <button disabled>Sure!</button>
        )}
      </form>
      <Link to='/'> Skip </Link>
    </div>
  );
};

export default InfoStep1;
