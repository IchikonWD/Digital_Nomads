import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../Contexts/userContext';
import InfoSteps from '../InfoSteps/InfoSteps';

const InfoStep3 = ({ history }) => {
  const { user, setUser } = useContext(UserContext);
  const [cluster, setCluster] = useState('');
  // Food Interests
  const [burguers, setBurguers] = useState(false);
  const [mediterranean, setMediterranean] = useState(false);
  const [indian, setIndian] = useState(false);
  const [sushi, setSushi] = useState(false);
  const [italian, setItalian] = useState(false);
  const [chinese, setChinese] = useState(false);
  // Leisure Interests
  const [drinks, setDrinks] = useState(false);
  const [coffee, setCoffee] = useState(false);
  const [sunsets, setSunsets] = useState(false);
  const [parties, setParties] = useState(false);

  // Redirect to home if user is not logged in
  useEffect(() => {
    if (user.isLoggedIn === false) {
      history.push('/');
    }
  }, [user, history]);

  // Check if user has already filled out the form
  useEffect(() => {
    if (user.interests) {
      if (user.interests.burguers) {
        setBurguers(user.interests.burguers);
      }
      if (user.interests.mediterranean) {
        setMediterranean(user.interests.mediterranean);
      }
      if (user.interests.indian) {
        setIndian(user.interests.indian);
      }
      if (user.interests.sushi) {
        setSushi(user.interests.sushi);
      }
      if (user.interests.italian) {
        setItalian(user.interests.italian);
      }
      if (user.interests.chinese) {
        setChinese(user.interests.chinese);
      }
      if (user.interests.drinks) {
        setDrinks(user.interests.drinks);
      }
      if (user.interests.coffee) {
        setCoffee(user.interests.coffee);
      }
      if (user.interests.sunsets) {
        setSunsets(user.interests.sunsets);
      }
      if (user.interests.parties) {
        setParties(user.interests.parties);
      }
    } else {
      setUser({
        ...user,
        interests: {
          burguers: false,
          mediterranean: false,
          indian: false,
          sushi: false,
          italian: false,
          chinese: false,
          drinks: false,
          coffee: false,
          sunsets: false,
          parties: false,
        },
      });
    }
  }, [user, setUser, history]);

  useEffect(() => {
    async function saveInterests() {
      if (user.interests) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        };
        try {
          const url = `http://localhost:5000/api/users/profile/`;
          const res = await axios.put(
            url,
            {
              _id: user._id,
              interests: {
                burguers: user.interests.burguers,
                mediterranean: user.interests.mediterranean,
                indian: user.interests.indian,
                sushi: user.interests.sushi,
                italian: user.interests.italian,
                chinese: user.interests.chinese,
                drinks: user.interests.drinks,
                coffee: user.interests.coffee,
                sunsets: user.interests.sunsets,
                parties: user.interests.parties,
                surf: user.interests.surf,
                fitness: user.interests.fitness,
                volley: user.interests.volley,
                paddle: user.interests.paddle,
                climbing: user.interests.climbing,
                running: user.interests.running,
                football: user.interests.football,
                trecking: user.interests.trecking,
                museums: user.interests.museums,
                bookstores: user.interests.bookstores,
                theaters: user.interests.theaters,
                movies: user.interests.movies,
                guidedVisits: user.interests.guidedVisits,
                concerts: user.interests.concerts,
                parks: user.interests.parks,
                ruralTourism: user.interests.ruralTourism,
              },
            },
            config
          );
          if (res.data) {
            console.log('Interests saved');
          }
        } catch (err) {
          console.log(err.response.data.message);
        }
      }
    }
    saveInterests();
  }, [user._id, user.interests, user.token]);

  // Save cluster to user

  useEffect(() => {
    async function saveCluster() {
      if (cluster) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        };
        try {
          const url = `http://localhost:5000/api/users/profile/`;
          const res = await axios.put(
            url,
            {
              _id: user._id,
              cluster: cluster.cluster,
            },
            config
          );
          if (res.data) {
            console.log('Cluster saved');
          }
        } catch (err) {
          console.log(err.response.data.message);
        }
      }
    }
    saveCluster();
  }, [cluster, user.token, user._id]);

  // Save user interests
  const handleInterests = (e) => {
    e.preventDefault();
    const interests = {
      burguers: burguers,
      mediterranean: mediterranean,
      indian: indian,
      sushi: sushi,
      italian: italian,
      chinese: chinese,
      drinks: drinks,
      coffee: coffee,
      sunsets: sunsets,
      parties: parties,
    };
    // Combine interests with old ones and save in user object
    setUser({
      ...user,
      interests: {
        ...user.interests,
        ...interests,
      },
    });
    localStorage.setItem(
      'user',
      JSON.stringify({
        ...user,
        interests: {
          ...user.interests,
          ...interests,
        },
      })
    );
    async function sendInterests() {
      if (user.interests) {
        // Headers to python flask server
        const configPython = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        try {
          const data = {
            _id: user._id,
            interests: {
              burguers: user.interests.burguers,
              mediterranean: user.interests.mediterranean,
              indian: user.interests.indian,
              sushi: user.interests.sushi,
              italian: user.interests.italian,
              chinese: user.interests.chinese,
              drinks: user.interests.drinks,
              coffee: user.interests.coffee,
              sunsets: user.interests.sunsets,
              parties: user.interests.parties,
              surf: user.interests.surf,
              fitness: user.interests.fitness,
              volley: user.interests.volley,
              paddle: user.interests.paddle,
              climbing: user.interests.climbing,
              running: user.interests.running,
              football: user.interests.football,
              trecking: user.interests.trecking,
              museums: user.interests.museums,
              bookstores: user.interests.bookstores,
              theaters: user.interests.theaters,
              movies: user.interests.movies,
              guidedVisits: user.interests.guidedVisits,
              concerts: user.interests.concerts,
              parks: user.interests.parks,
              ruralTourism: user.interests.ruralTourism,
            },
          };
          const sendData = JSON.stringify(data);
          const url = `https://nomad-spain-api.herokuapp.com/cluster`;
          const res = await axios.post(url, sendData, configPython);
          if (res.data) {
            setCluster(res.data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    sendInterests();
    history.push('/infostep4');
  };

  const handleButton = async (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <div className='info-step3'>
      <header className='user_profile_editing__header'>
        <i className='fas fa-chevron-left user_profile_editing__header__icon'>
          <button className='hidden_button' onClick={handleButton}></button>
        </i>
        <button
          className='info-step2-close-button hidden_button'
          onClick={handleButton}
        >
          <p className='info-step2-close-caption'>Close</p>
        </button>
      </header>
      <h2 className='info-step3-cta'>Meet other digital nomads</h2>
      <form onSubmit={handleInterests}>
        <h4 className='foodstep3'>Food</h4>
        <input
          type='checkbox'
          name='Burguers'
          id='Burguers'
          checked={burguers}
          value={burguers}
          className='checkboxstep3 burguercheck'
          onChange={() => setBurguers(!burguers)}
        />
        <h3 className='step3text textburguers'>Burguers</h3>
        <input
          type='checkbox'
          name='Mediterranean'
          id='Mediterranean'
          checked={mediterranean}
          value={mediterranean}
          className='checkboxstep3 mediterraneancheck'
          onChange={() => setMediterranean(!mediterranean)}
        />
        <h3 className='step3text textmediterranean'> Mediterranean </h3>
        <input
          type='checkbox'
          name='Indian'
          id='Indian'
          value={indian}
          checked={indian}
          className='checkboxstep3 indiancheck'
          onChange={() => setIndian(!indian)}
        />
        <h3 className='step3text textindian'>Indian</h3>
        <input
          type='checkbox'
          name='Sushi'
          id='Sushi'
          checked={sushi}
          value={sushi}
          className='checkboxstep3 sushicheck'
          onChange={() => setSushi(!sushi)}
        />{' '}
        <h3 className='step3text textsushi'>Sushi</h3>
        <input
          type='checkbox'
          name='Italian'
          id='Italian'
          checked={italian}
          value={italian}
          className='checkboxstep3 italiancheck'
          onChange={() => setItalian(!italian)}
        />
        <h3 className='step3text textitalian'>Italian</h3>
        <input
          type='checkbox'
          name='Chinese'
          id='Chinese'
          checked={chinese}
          value={chinese}
          className='checkboxstep3 chinesecheck'
          onChange={() => setChinese(!chinese)}
        />
        <h3 className='step3text textchinese'>Chinese</h3>
        <h4 className='leisuretime'>Leisure time</h4>
        <input
          type='checkbox'
          name='Drinks at night'
          id='Drinks at night'
          checked={drinks}
          value={drinks}
          className='checkboxstep3 drinkscheck'
          onChange={() => setDrinks(!drinks)}
        />
        <h3 className='step3text textdrinks'> Drinks at night</h3>
        <input
          type='checkbox'
          name='Coffee'
          id='Coffee'
          checked={coffee}
          value={coffee}
          className='checkboxstep3 coffeecheck'
          onChange={() => setCoffee(!coffee)}
        />
        <h3 className='step3text textcoffee'>Coffee</h3>
        <input
          type='checkbox'
          name='Sunsets'
          id='Sunsets'
          checked={sunsets}
          value={sunsets}
          className='checkboxstep3 sunsetscheck'
          onChange={() => setSunsets(!sunsets)}
        />
        <h3 className='step3text textsunsets'>Sunsets</h3>
        <input
          type='checkbox'
          name='Parties'
          id='Parties'
          checked={parties}
          value={parties}
          className='checkboxstep3 partiescheck'
          onChange={() => setParties(!parties)}
        />
        <h3 className='step3text textparties'> Parties</h3>
        {/* <InfoSteps step1 step2 /> */}
        <button className='primary_button infostep3button' type='submit'>
          Done
        </button>
      </form>
    </div>
  );
};

export default InfoStep3;
