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
  const [avatar, setAvatar] = useState('');
  const [updatedUser, setUpdatedUser] = useState({});

  // Redirect to home if user is not logged in
  useEffect(() => {
    if (user.isLoggedIn === false) {
      history.push('/');
    }
  }, [user, history]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    document.location.href = '/login';
  };

  // Save changes to database
  useEffect(() => {
    async function saveUpdatedUser() {
      if (
        updatedUser.name !== user.name ||
        updatedUser.age !== user.age ||
        updatedUser.ocupation !== user.ocupation ||
        updatedUser.country !== user.country ||
        updatedUser.language !== user.language ||
        updatedUser.avatar !== user.avatar
      ) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        };
        try {
          const { name, age, ocupation, country, language, avatar } =
            updatedUser;
          const url = `http://localhost:5000/api/users/profile/`;
          const res = await axios.put(
            url,
            {
              name,
              age,
              ocupation,
              country,
              language,
              avatar,
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
  }, [updatedUser, user, setUser]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        'http://localhost:5000/api/upload',
        formData,
        config
      );
      setAvatar(data);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const handleEditing = () => {
    setEditing(!editing);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdatedUser({
      name,
      age,
      ocupation,
      country,
      language,
      avatar,
    });
    handleEditing();
  };

  const handleButton = async (e) => {
    e.preventDefault();
    history.push('/');
  };

  if (editing === true) {
    return (
      <div className='user_profile_editing'>
        <img src='/assets/images/Vectorprofile.png' alt='vector'></img>
        <header className='user_profile_editing__header'>
          <i className='fas fa-chevron-left user_profile_editing__header__icon'>
            <button className='hidden_button' onClick={handleButton}></button>
          </i>
          <button
            className='user_profile_editing__header__button hidden_button'
            onClick={handleEditing}
          >
            <p className='interests_close'>Close</p>
          </button>
        </header>
        <form className='user_profile_editing__form' onSubmit={handleSubmit}>
          {user.avatar ? (
            <div className='personal-image'>
              <label className='label'>
                <input
                  type='file'
                  id='avatar-file'
                  custom='file'
                  onChange={uploadFileHandler}
                />
                <figure className='personal-figure'>
                  <img
                    src={`${user.avatar}`}
                    className='personal-avatar'
                    alt='avatar'
                  />
                  <figcaption className='personal-figcaption'>
                    <img
                      src='/assets/icons/camera-white.png'
                      alt='camera logo'
                    />
                  </figcaption>
                </figure>
              </label>
            </div>
          ) : (
            <div className='personal-image'>
              <label className='label'>
                <input
                  type='file'
                  id='avatar-file'
                  custom='file'
                  onChange={uploadFileHandler}
                />
                <figure className='personal-figure'>
                  <img
                    src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBSosYcX8VPrpuos_y96aBACA795fmUqppmQ&usqp=CAU`}
                    className='personal-avatar'
                    alt='avatar'
                  />
                  <figcaption className='personal-figcaption'>
                    <img
                      src='/assets/icons/camera-white.png'
                      alt='camera logo'
                    />
                  </figcaption>
                </figure>
              </label>
            </div>
          )}
          <h2 className='name__title'>{user.name}</h2>
          <img
            className='profile_input_textname'
            src='/assets/images/name_text.png'
            alt='name'
          />
          <input
            type='text'
            placeholder={user.name}
            value={name}
            className='input__field'
            onChange={(e) => setName(e.target.value)}
          />
          <img
            className='profile_input_textage'
            src='/assets/images/age_text.png'
            alt='age'
          />
          <input
            type='number'
            placeholder={user.age}
            value={age}
            className='input__field2'
            onChange={(e) => setAge(e.target.value)}
          />
          <img
            className='profile_input_textprofesion'
            src='/assets/images/profesion_text.png'
            alt='age'
          />
          <input
            type='text'
            placeholder={user.ocupation}
            value={ocupation}
            className='input__field3'
            onChange={(e) => setOcupation(e.target.value)}
          />
          <img
            className='profile_input_textcountry'
            src='/assets/images/country_text.png'
            alt='age'
          />
          <input
            type='text'
            placeholder={user.country}
            value={country}
            className='input__field4'
            onChange={(e) => setCountry(e.target.value)}
          />
          <img
            className='profile_input_textlanguage'
            src='/assets/images/language_text.png'
            alt='age'
          />
          <input
            type='text'
            placeholder={user.language}
            value={language}
            className='input__field5'
            onChange={(e) => setLanguage(e.target.value)}
          />
          <button className='secondary_button input__button' type='submit'>
            Save Changes
          </button>
        </form>
        <Link className='interests_profile' to='/infostep2'>
          {' '}
          Change interests{' '}
        </Link>
      </div>
    );
  } else {
    return (
      <div className='user_profile_editing'>
        <img src='/assets/images/Vectorprofile.png' alt='vector'></img>
        <header className='user_profile_editing__header'>
          <i className='fas fa-chevron-left user_profile_editing__header__icon'>
            <button className='hidden_button' onClick={handleButton}></button>
          </i>
          <button
            className='user_profile_editing__header__button hidden_button'
            onClick={handleEditing}
          >
            <img src='/assets/icons/EditarPerfil.png' alt='' />
          </button>
        </header>
        <div className='user_profile_info'>
          {user.avatar ? (
            <div className='personal-image'>
              <label className='label'>
                <figure className='personal-figure'>
                  <input
                    type='file'
                    id='avatar-file'
                    custom='file'
                    alt='avatar'
                    onChange={uploadFileHandler}
                  />
                  <img
                    src={`${user.avatar}`}
                    className='personal-avatar'
                    alt='avatar'
                  />
                  <figcaption className='personal-figcaption'>
                    <img
                      src='/assets/icons/camera-white.png'
                      alt='camera logo'
                    />
                  </figcaption>
                </figure>
              </label>
            </div>
          ) : (
            <div className='personal-image'>
              <label className='label'>
                <input
                  type='file'
                  id='avatar-file'
                  custom='file'
                  alt='avatar'
                  onChange={uploadFileHandler}
                />
                <figure className='personal-figure'>
                  <img
                    src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBSosYcX8VPrpuos_y96aBACA795fmUqppmQ&usqp=CAU`}
                    className='personal-avatar'
                    alt='avatar'
                  />
                  <figcaption className='personal-figcaption'>
                    <img
                      src='/assets/icons/camera-white.png'
                      alt='camera logo'
                    />
                  </figcaption>
                </figure>
              </label>
            </div>
          )}
          <h3 className='user_info'>{user.name}</h3>
          <hr className='user_info_spacer' />
          <h3 className='user_info2'>{user.age}</h3>
          <hr className='user_info_spacer' />
          <h3 className='user_info3'>{user.ocupation}</h3>
          <hr className='user_info_spacer' />
          <h3 className='user_info4'>{user.country}</h3>
          <hr className='user_info_spacer' />
          <h3 className='user_info5'>{user.language}</h3>
        </div>
        <a className='interests_profile2' onClick={handleLogout}>
          Log Out
        </a>
      </div>
    );
  }
};

export default Profile;
