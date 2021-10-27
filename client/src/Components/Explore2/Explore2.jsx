import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useContext,
} from 'react';

import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import Explore from '../Explore/Explore';
import { FilterContext } from '../../Contexts/filterContext';

const Explore2 = ({ history }) => {
  const { filters, setFilters } = useContext(FilterContext);

  const [temperature, setTemperature] = useState([10, 37]);
  const [population, setPopulation] = useState([3000, 4000000]);

  //Temperature
  const [minValTemperature, setMinValTemperature] = useState(10);
  const [maxValTemperature, setMaxValTemperature] = useState(37);
  const minValRefTemperature = useRef();
  const maxValRefTemperature = useRef();
  //Population
  const [minValPopulation, setMinValPopulation] = useState(3000);
  const [maxValPopulation, setMaxValPopulation] = useState(4000000);
  const minValRefPopulation = useRef();
  const maxValRefPopulation = useRef();

  const range = useRef(null);

  useEffect(() => {
    if (filters) {
      if (filters.temperature) {
        setTemperature(temperature);
      }
      if (filters.population) {
        setPopulation(population);
      }
    } else {
      setFilters({
        ...filters,
        currentFilters: {
          temperature: [10, 37],
          population: [3000, 4000000],
        },
      });
    }
  }, [filters, setFilters, temperature, population]);

  const handleFilters2 = (e) => {
    e.preventDefault();
    const currentFilters = {
      temperature: temperature,
      population: population,
    };
    setFilters({ ...filters, ...currentFilters });
    history.push('/results');
  };

  useEffect(() => {
    setTemperature([minValTemperature, maxValTemperature]);
    setPopulation([minValPopulation, maxValPopulation]);
  }, [
    minValTemperature,
    maxValTemperature,
    setTemperature,
    minValPopulation,
    maxValPopulation,
    setPopulation,
  ]);

  // Convert to percentage

  const getPercent = useCallback(
    (value) => Math.round(((value - 1) / (5 - 1)) * 100),
    []
  );

  // Set width of the range to decrease from the left side

  useEffect(() => {
    const minPercent = getPercent(minValTemperature);
    const maxPercent = getPercent(maxValRefTemperature.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minValTemperature, getPercent]);

  // Set width of the range to decrease from the right side

  useEffect(() => {
    const minPercent = getPercent(minValRefTemperature.current);
    const maxPercent = getPercent(maxValTemperature);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxValTemperature, getPercent]);

  //! MutiRangeSlider Functions
  //!TODO: Fix styling on ranges!

  return (
    <div className='explore2'>
      <h2>Choose your nomad needs</h2>
      <form onSubmit={handleFilters2}>
        <div className='needsContainer'>
          <div className='need'>
            <div className='need_name'>
              <span>Average temperature</span>
              <ToggleSwitch label='Average temperature' />
            </div>
            <div className='ranges'>
              <p>From 10°C to 37°C</p>
              {/* ****************Temp slider********************* */}
              <div className='multirangeslider'>
                <input
                  type='range'
                  min={10}
                  max={37}
                  value={minValTemperature}
                  onChange={(event) => {
                    const value = Math.min(
                      Number(event.target.value),
                      maxValTemperature - 1
                    );
                    setMinValTemperature(value);
                    minValRefTemperature.current = value;
                  }}
                  className='thumb thumb--left'
                />
                <input
                  type='range'
                  min={10}
                  max={37}
                  value={maxValTemperature}
                  onChange={(event) => {
                    const value = Math.max(
                      Number(event.target.value),
                      minValTemperature + 1
                    );
                    setMaxValTemperature(value);
                    maxValRefTemperature.current = value;
                  }}
                  className='thumb thumb--right'
                />
                <div className='slider'>
                  <div className='slider__track' />
                  <div ref={range} className='slider__range' />
                  <div className='slider__left-value'>{minValTemperature}</div>
                  <div className='slider__right-value'>{maxValTemperature}</div>
                </div>
              </div>
            </div>
          </div>
          <div className='need'>
            <div className='need_name'>
              <span>Population</span>
              <ToggleSwitch label='Population' />
            </div>
            <div className='ranges'>
              <p>From 3000 out to 4M hab.</p>
              {/* ****************Population slider********************* */}
              <div className='multirangeslider'>
                <input
                  type='range'
                  min={3000}
                  max={4000000}
                  value={minValPopulation}
                  onChange={(event) => {
                    const value = Math.min(
                      Number(event.target.value),
                      maxValPopulation - 1
                    );
                    setMinValPopulation(value);
                    minValRefPopulation.current = value;
                  }}
                  className='thumb thumb--left'
                />
                <input
                  type='range'
                  min={3000}
                  max={4000000}
                  value={maxValPopulation}
                  onChange={(event) => {
                    const value = Math.max(
                      Number(event.target.value),
                      minValPopulation + 1
                    );
                    setMaxValPopulation(value);
                    maxValRefPopulation.current = value;
                  }}
                  className='thumb thumb--right'
                />
                <div className='slider'>
                  <div className='slider__track' />
                  <div ref={range} className='slider__range' />
                  <div className='slider__left-value'>{minValPopulation}</div>
                  <div className='slider__right-value'>{maxValPopulation}</div>
                </div>
              </div>
            </div>
          </div>
          <Explore step1 step2 />
          <button type='submit'>Search</button>
        </div>
      </form>
    </div>
  );
};

export default Explore2;
