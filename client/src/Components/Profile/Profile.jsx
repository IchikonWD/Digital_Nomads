import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../Contexts/userContext';

const Profile = ({ history }) => {
  const { user, setUser } = useContext(UserContext);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [ocupation, setOcupation] = useState('');
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState('');
  const [updatedUser, setUpdatedUser] = useState({});

  // Redirect to home if user is not logged in
  useEffect(() => {
    if (user.isLoggedIn === false) {
      history.push('/');
    }
  }, [user, history]);

  const handleEditing = () => {
    setEditing(!editing);
  };
  // Save changes to database
  useEffect(() => {
    async function saveUpdatedUser() {
      if (updatedUser) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        };
        try {
          const { name, age, ocupation, country, language } = updatedUser;
          const url = `http://localhost:5000/api/users/profile/`;
          const res = await axios.put(
            url,
            {
              name,
              age,
              ocupation,
              country,
              language,
            },
            config
          );
          if (res.data) {
            setUser(res.data);
            localStorage.setItem('user', JSON.stringify(res.data));
          } else {
            console.log('Error');
          }
        } catch (err) {
          console.log(err.response.data.message);
        }
      }
    }
    saveUpdatedUser();
  }, [updatedUser, setUser, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdatedUser({
      name,
      age,
      ocupation,
      country,
      language,
    });
    handleEditing();
  };

  if (editing === true) {
    return (
      <div className='user_profile_editing'>
        <Link to='/'> Close </Link>
        <h1>Profile</h1>{' '}
        <span>
          <button onClick={handleEditing}>
            <i className='far fa-edit'></i>
          </button>
        </span>
        <hr />
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder={user.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='number'
            placeholder={user.age}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            type='text'
            placeholder={user.ocupation}
            value={ocupation}
            onChange={(e) => setOcupation(e.target.value)}
          />
          <input
            type='text'
            placeholder={user.country}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            type='text'
            placeholder={user.language}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <button type='submit'>Change Info</button>
        </form>
      </div>
    );
  } else {
    return (
      <div className='user_profile'>
        <Link to='/'> Close </Link>
        <h1>Profile</h1>{' '}
        <span>
          <button onClick={handleEditing}>
            <i className='far fa-edit'></i>
          </button>
        </span>
        <hr />
        <div className='user_profile_info'>
          <img
            src='https://i.pinimg.com/236x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg'
            alt='Avatar'
          />
          <h3>{user.name}</h3>
          <h3>{user.age}</h3>
          <h3>{user.ocupation}</h3>
          <h3>{user.country}</h3>
          <h3>{user.language}</h3>
        </div>
        <Link to='/infostep2'>
          <button>Change Interests</button>
        </Link>
        <Link to='/'>Log Out</Link>
      </div>
    );
  }
};

export default Profile;
