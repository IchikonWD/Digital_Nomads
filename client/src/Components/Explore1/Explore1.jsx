import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useContext,
} from 'react';
import { FilterContext } from '../../Contexts/filterContext';

import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
// import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider"
import Explore from '../Explore/Explore';

const Explore1 = ({ history }) => {
  const { filters, setFilters } = useContext(FilterContext);

  const [internet, setInternet] = useState([]);
  const [safety, setSafety] = useState([]);
  const [living, setLiving] = useState([]);
  //! MutiRangeSlider States
  //Internet
  const [minValInternet, setMinValInternet] = useState(1);
  const [maxValInternet, setMaxValInternet] = useState(100);
  const minValRefInternet = useRef();
  const maxValRefInternet = useRef();
  //Safety
  const [minValSafety, setMinValSafety] = useState(1);
  const [maxValSafety, setMaxValSafety] = useState(5);
  const minValRefSafety = useRef();
  const maxValRefSafety = useRef();
  //Living
  const [minValLiving, setMinValLiving] = useState(1);
  const [maxValLiving, setMaxValLiving] = useState(100);
  const minValRefLiving = useRef();
  const maxValRefLiving = useRef();

  const range = useRef(null);
  //! MutiRangeSlider States

  // Check if user has already filled out the filters
  useEffect(() => {
    if (filters) {
      if (filters.internet) {
        setInternet(internet);
      }
      if (filters.safety) {
        setSafety(safety);
      }
      if (filters.living) {
        setLiving(living);
      }
    } else {
      setFilters({
        ...filters,
        currentFilters: {
          internet: [1, 100],
          safety: [1, 5],
          living: [1, 100],
        },
      });
    }
  }, [filters, internet, safety, living, setFilters]);

  const handleFilters = (e) => {
    e.preventDefault();
    const currentFilters = {
      internet: internet,
      safety: safety,
      living: living,
    };
    setFilters({ ...filters, ...currentFilters });
    history.push('/explore2');
  };
  useEffect(() => {
    setInternet([minValInternet, maxValInternet]);
    setSafety([minValSafety, maxValSafety]);
    setLiving([minValLiving, maxValLiving]);
  }, [
    minValInternet,
    maxValInternet,
    setInternet,
    minValSafety,
    maxValSafety,
    setSafety,
    minValLiving,
    maxValLiving,
    setLiving,
  ]);

  //! MutiRangeSlider Functions
  // Convert to percentage

  const getPercent = useCallback(
    (value) => Math.round(((value - 1) / (5 - 1)) * 100),
    []
  );

  // Set width of the range to decrease from the left side

  useEffect(() => {
    const minPercent = getPercent(minValInternet);
    const maxPercent = getPercent(maxValRefInternet.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minValInternet, getPercent]);

  // Set width of the range to decrease from the right side

  useEffect(() => {
    const minPercent = getPercent(minValRefInternet.current);
    const maxPercent = getPercent(maxValInternet);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxValInternet, getPercent]);

  //! MutiRangeSlider Functions
  return (
    <div className='explore'>
      <img onClick={handleFilters} className="explore1_image" src="/assets/images/explore_1.png" alt="explore1_image" />
      <h2>Choose your nomad needs</h2>
      <form onSubmit={handleFilters}>
        <div className='needsContainer'>
          <div className='need'>
            <div className='need_name'>
              <span>Internet connection</span>
              <ToggleSwitch label='Internet connection' />
            </div>
            <div className='ranges'>
              <p>From Low to Supreme</p>
              {/* ****************Internet slider********************* */}
              <div className='multirangeslider'>
                <input
                  type='range'
                  min={1}
                  max={100}
                  value={minValInternet}
                  onChange={(event) => {
                    const value = Math.min(
                      Number(event.target.value),
                      maxValInternet - 1
                    );
                    setMinValInternet(value);
                    minValRefInternet.current = value;
                  }}
                  className='thumb thumb--left'
                // style={{ zIndex: minValInternet > 5 - 100 && "5" }}
                />
                <input
                  type='range'
                  min={1}
                  max={100}
                  value={maxValInternet}
                  onChange={(event) => {
                    const value = Math.max(
                      Number(event.target.value),
                      minValInternet + 1
                    );
                    setMaxValInternet(value);
                    maxValRefInternet.current = value;
                  }}
                  className='thumb thumb--right'
                />
                <div className='slider'>
                  <div className='slider__track' />
                  <div ref={range} className='slider__range' />
                  <div className='slider__left-value'>{minValInternet}</div>
                  <div className='slider__right-value'>{maxValInternet}</div>
                </div>
              </div>
            </div>
          </div>
          <div className='need'>
            <div className='need_name'>
              <span>Safety</span>
              <ToggleSwitch label='Safety' />
            </div>
            <div className='ranges'>
              <p>From Get out to Safest</p>
              <div className='multirangeslider'>
                <input
                  type='range'
                  min={1}
                  max={5}
                  value={minValSafety}
                  onChange={(event) => {
                    const value = Math.min(
                      Number(event.target.value),
                      maxValSafety - 1
                    );
                    setMinValSafety(value);
                    minValRefSafety.current = value;
                  }}
                  className='thumb thumb--left'
                // style={{ zIndex: minValSafety > 5 - 100 && "5" }}
                />
                <input
                  type='range'
                  min={1}
                  max={5}
                  value={maxValSafety}
                  onChange={(event) => {
                    const value = Math.max(
                      Number(event.target.value),
                      minValSafety + 1
                    );
                    setMaxValSafety(value);
                    maxValRefSafety.current = value;
                  }}
                  className='thumb thumb--right'
                />
                <div className='slider'>
                  <div className='slider__track' />
                  <div ref={range} className='slider__range' />
                  <div className='slider__left-value'>{minValSafety}</div>
                  <div className='slider__right-value'>{maxValSafety}</div>
                </div>
              </div>
            </div>
          </div>
          <div className='need'>
            <div className='need_name'>
              <span>Cost of living</span>
              <ToggleSwitch label='Cost of living' />
            </div>
            <div className='ranges'>
              <p>From 1000 to 3000 eur/mo</p>
              {/* ****************Living slider********************* */}
              <div className='multirangeslider'>
                <input
                  type='range'
                  min={1}
                  max={100}
                  value={minValLiving}
                  onChange={(event) => {
                    const value = Math.min(
                      Number(event.target.value),
                      maxValLiving - 1
                    );
                    setMinValLiving(value);
                    minValRefLiving.current = value;
                  }}
                  className='thumb thumb--left'
                // style={{ zIndex: minValLiving > 5 - 100 && "5" }}
                />
                <input
                  type='range'
                  min={1}
                  max={100}
                  value={maxValLiving}
                  onChange={(event) => {
                    const value = Math.max(
                      Number(event.target.value),
                      minValLiving + 1
                    );
                    setMaxValLiving(value);
                    maxValRefLiving.current = value;
                  }}
                  className='thumb thumb--right'
                />
                <div className='slider'>
                  <div className='slider__track' />
                  <div ref={range} className='slider__range' />
                  <div className='slider__left-value'>{minValLiving}</div>
                  <div className='slider__right-value'>{maxValLiving}</div>
                </div>
              </div>
            </div>
          </div>
          <Explore step1 />
          <button type='submit'>Next</button>
        </div>
      </form>
    </div>
  );
};

export default Explore1;
