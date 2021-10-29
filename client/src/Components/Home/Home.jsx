import React, { useContext, useState, useEffect } from 'react';
import Flickity from 'react-flickity-component';
import { DataContext } from '../../Contexts/dataContext';
import axios from 'axios';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Home = ({ history }) => {
  const { setData } = useContext(DataContext);
  const [cities, setCities] = useState([]);
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    // Get's all city names and loads them for the suggestion section
    const loadCities = async () => {
      const url = `http://localhost:5000/api/data`;
      const res = await axios.get(url);
      setCities(res.data);
    };
    loadCities();
  }, []);
  // Filters all city names and matches it with the input text
  const onChangeHandler = (text) => {
    let modText = text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
    let matches = [];
    if (text.length > 0) {
      matches = cities.filter((city) => {
        const regex = new RegExp(`${modText}`);
        return city.name.match(regex);
      });
    }
    console.log(matches);
    setSuggestions(matches);
    setText(text);
  };
  // Sets the suggestion value to the input value
  const onSuggestHandler = (text) => {
    setText(text);
    setSuggestions([]);
  };
  // Redirects to /map/city where city = input text or suggestion
  const submitHandler = (e) => {
    e.preventDefault();
    setData(text);
    history.push(`/map/${e.target.city.value.replace(/ /g, '_')}`);
  };
  // Button click handler
  const handleGoExplore = () => {
    history.push('/explore1');
  };

  const flickityOptions = {
    initialIndex: 0,
  };

  return (
    <>
      <Header />
      <div className='home'>
        <div className='home__home1'>
          <form className='home__form_search' onSubmit={submitHandler}>
            <input
              type='text'
              name='city'
              onChange={(e) => onChangeHandler(e.target.value)}
              value={text}
              placeholder='Where are you going?'
              className='home__input_search'
              autoComplete='off'
            />
          </form>
          {suggestions ? (
            <div className='suggestions_container'>
              {suggestions.map((suggestions, i) => (
                <p
                  key={i}
                  className='suggestion'
                  onClick={() => onSuggestHandler(suggestions.name)}
                >
                  {suggestions.name}
                </p>
              ))}
            </div>
          ) : (
            ''
          )}
          <div className='home__home1_core'>
            <img
              className='home__home1_imgvertical'
              src='/assets/images/Ordenador_chico.png'
              alt='PC Nomad'
            />
            <div className='home__cta_container'>
              <p className='home__cta_explore'>
                Choose your next nomad destination according to your needs
              </p>
              <button className='home__btn_explore' onClick={handleGoExplore}>
                Explore now
              </button>
            </div>
            <img
              className='home__home1_imgvertical'
              src='/assets/images/Caminantes.png'
              alt='Caravan Nomad'
            />
          </div>
          <img
            className='home__home1_imghorizontal'
            src='/assets/images/Caravana.png'
            alt='Walker Nomad'
          />
        </div>
        <div className='home__home2'>
          <p className='home__home2_info'>
            Matching the needs of digital nomads and remote workers to the best
            place in Spain.
          </p>
          <div>
            <ul className='home__home2_list'>
              <li>Sunny places</li>
              <li>Safety</li>
              <li>Surf places</li>
              <li>Living costs</li>
              <li>Internet places</li>
              <li>Meet other nomads</li>
            </ul>
          </div>
          <img
            className='paddle_surf_img'
            src='/assets/images/paddle_surf.png'
            alt='Walker Nomad'
          />
        </div>
        <div className='home3'>
          <p className='slider_header'>Best nomad places</p>
        </div>
        <Flickity
          className={'carousel'} // default ''
          elementType={'div'} // default 'div'
          options={flickityOptions} // takes flickity options {}
          disableImagesLoaded={false} // default false
          reloadOnUpdate // default false
          static // default false
          prevNextButtons={false}
          pageDots={false}
        >
          {cities.map((city) => (
            <div key={city.name} className='carousel__card'>
              <img src={city.image} alt={city.name} />
              <h3 className='carousel_title'>{city.name}</h3>
            </div>
          ))}
        </Flickity>
      </div>
      <Footer />
    </>
  );
};

export default Home;
