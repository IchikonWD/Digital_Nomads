import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../Contexts/dataContext';
import axios from 'axios'

const Home = ({ history }) => {
  const { data, setData } = useContext(DataContext);
  const [cities, setCities] = useState([])
  const [text, setText] = useState("")
  const [suggestions, setSuggestions] = useState([])
  useEffect(() => {
    // Get's all city names and loads them for the suggestion section
    const loadCities = async () => {
      const url = `http://localhost:5000/api/data`
      const res = await axios.get(url)
      console.log(res.data);
      setCities(res.data)
    }
    loadCities()
  }, [])
  // Filters all city names and matches it with the input text
  const onChangeHandler = (text) => {
    let modText = text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
    let matches = []
    if (text.length > 0) {
      matches = cities.filter((city) => {
        const regex = new RegExp(`${modText}`)
        return city.name.match(regex)
      })
    }
    console.log(matches);
    setSuggestions(matches)
    setText(text)
  }
  // Sets the suggestion value to the input value
  const onSuggestHandler = (text) => {
    let modText = text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
    setText(modText)
    setSuggestions([])
  }
  // Redirects to /map/city where city = input text or suggestion
  const submitHandler = (e) => {
    e.preventDefault();
    setData(e.target.city.value)
    history.push(`/map/${e.target.city.value}`)
    console.log(data);
    console.log(e.target.city.value)
  };
  // Button click handler
  const handleGoExplore = () => {
    history.push('/explore');
  };

  return (
    <div className='home'>
      <div className='home1'>
        <form onSubmit={submitHandler}>
          <input type='text' name='city' onChange={(e) => onChangeHandler(e.target.value)} value={text} />
          {
            suggestions ? suggestions.map((suggestions, i) => <div key={i} onClick={() => onSuggestHandler(suggestions.name)}>{suggestions.name}</div>) : ""
          }
          <p>Choose your next nomad destination according to your needs</p>
        </form>
        <button onClick={handleGoExplore}>Explore now</button>
      </div>
      <div className='home2'>
        <p>Matching the needs of digital nomads and remote workers to the best place in Spain</p>
        <ul>
          <li>Sunny places</li>
          <li>Safety</li>
          <li>Surf places</li>
          <li>Living costs</li>
          <li>Internet places</li>
          <li>Meet other nomads</li>
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
