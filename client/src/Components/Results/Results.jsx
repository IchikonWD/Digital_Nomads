import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { FilterContext } from '../../Contexts/filterContext';

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
    <div className='results'>
      <h2>Your best matches</h2>
      <p>Top best spanish cities</p>
      {filteredCities.map((city) => (
        <div key={city.name} className='results__card'>
          <Link to={`/city/${city.name}`}>
            <img src={city.image} alt={city.name} />
          </Link>
          <h2>{city.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default Results;
