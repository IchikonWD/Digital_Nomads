import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../Contexts/dataContext';
import axios from 'axios'

const Home = ({ history }) => {
  const { data, setData } = useContext(DataContext);
  const [cities, setCities] = useState([])
  const [text, setText] = useState("")
  const [suggestions, setSuggestions] = useState([])
  useEffect(() => {
    const loadCities = async () => {
      const url = `http://localhost:5000/api/data`
      const res = await axios.get(url)
      console.log(res.data);
      setCities(res.data)
    }
    loadCities()
  }, [])
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
  const onSuggestHandler = (text) => {
    let modText = text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
    setText(modText)
    setSuggestions([])


  }
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
          <input type='text' name='city' onChange={(e) => onChangeHandler(e.target.value)} value={text} />
          {
            suggestions ? suggestions.map((suggestions, i) => <div key={i} onClick={() => onSuggestHandler(suggestions.name)}>{suggestions.name}</div>) : ""
          }
          <div></div>

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
