import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { FilterContext } from '../../Contexts/filterContext';
import Header from '../Header/Header'

const Results = ({ history }) => {
  const { filters } = useContext(FilterContext);
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const url = `http://localhost:5000/api/data/`;
      const res = await axios.get(url);
      if (res.data) {
        try {
          if (res.data.length === 0) {
            alert('Error, we didnt received any data');
            history.push('/');
          } else {
            const allCities = res.data;
            const filterCities = allCities
              .filter((city) => {
                return filters.temperature[0] <= city.summer_temp_min;
              })
              .filter((city) => {
                return filters.temperature[1] >= city.summer_temp_max;
              })
              .filter((city) => {
                return filters.internet[1] >= city.coverage_broadband;
              })
              .filter((city) => {
                return filters.internet[0] <= city.coverage_broadband;
              })
              .filter((city) => {
                return filters.living[0] <= city.cost_living_index;
              })
              .filter((city) => {
                return filters.living[1] >= city.cost_living_index;
              })
              .filter((city) => {
                return filters.population[0] <= city.population;
              })
              .filter((city) => {
                return filters.population[1] >= city.population;
              });
            setFilteredCities(filterCities);
          }
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
    }
    fetchData();
  }, [filters, history]);

  return (
    <div>
      <Header />
      <div className='results'>
        <h2 className="best-matches">Your best matches</h2>
        <p className="top-cities">Top best spanish cities</p>
        <img className="vector_profile_1" src='/assets/images/Vector_profile_1.png' alt='vector'></img>
        <div className="results-container">
          {filteredCities.map((city) => (
            <div key={city.name} className='results-card'>
              <Link to={`/city/${city.name.replace(/ /g, '_')}`}>
                <img src={city.image} alt={city.name} className="results-image" />
              </Link>
              <p className="results-name">{city.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
