import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../Contexts/userContext';
import InfoSteps from '../InfoSteps/InfoSteps';

const InfoStep2 = ({ history }) => {
  const { user, setUser } = useContext(UserContext);
  // Sport Interests
  const [surf, setSurf] = useState(false);
  const [fitness, setFitness] = useState(false);
  const [volley, setVolley] = useState(false);
  const [paddle, setPaddle] = useState(false);
  const [climbing, setClimbing] = useState(false);
  const [running, setRunning] = useState(false);
  const [football, setFootball] = useState(false);
  const [trecking, setTrecking] = useState(false);

  //Cultural Interests
  const [museums, setMuseums] = useState(false);
  const [bookstores, setBookstores] = useState(false);
  const [theaters, setTheaters] = useState(false);
  const [movies, setMovies] = useState(false);
  const [guidedVisits, setGuidedVisits] = useState(false);
  const [concerts, setConcerts] = useState(false);
  const [parks, setParks] = useState(false);
  const [ruralTourism, setRuralTourism] = useState(false);

  // Redirect to home if user is not logged in
  useEffect(() => {
    if (user.isLoggedIn === false) {
      history.push('/');
    }
  }, [user, history]);

  // Check if user has already filled out the form
  useEffect(() => {
    if (user.interests) {
      if (user.interests.surf) {
        setSurf(user.interests.surf);
      }
      if (user.interests.fitness) {
        setFitness(user.interests.fitness);
      }
      if (user.interests.volley) {
        setVolley(user.interests.volley);
      }
      if (user.interests.paddle) {
        setPaddle(user.interests.paddle);
      }
      if (user.interests.climbing) {
        setClimbing(user.interests.climbing);
      }
      if (user.interests.running) {
        setRunning(user.interests.running);
      }
      if (user.interests.football) {
        setFootball(user.interests.football);
      }
      if (user.interests.trecking) {
        setTrecking(user.interests.trecking);
      }
      if (user.interests.museums) {
        setMuseums(user.interests.museums);
      }
      if (user.interests.bookstores) {
        setBookstores(user.interests.bookstores);
      }
      if (user.interests.theaters) {
        setTheaters(user.interests.theaters);
      }
      if (user.interests.movies) {
        setMovies(user.interests.movies);
      }
      if (user.interests.guidedVisits) {
        setGuidedVisits(user.interests.guidedVisits);
      }
      if (user.interests.concerts) {
        setConcerts(user.interests.concerts);
      }
      if (user.interests.parks) {
        setParks(user.interests.parks);
      }
      if (user.interests.ruralTourism) {
        setRuralTourism(user.interests.ruralTourism);
      }
    } else {
      setUser({
        ...user,
        interests: {
          surf: false,
          fitness: false,
          volley: false,
          paddle: false,
          climbing: false,
          running: false,
          football: false,
          trecking: false,
          museums: false,
          bookstores: false,
          theaters: false,
          movies: false,
          guidedVisits: false,
          concerts: false,
          parks: false,
          ruralTourism: false,
        },
      });
    }
  }, [user, history]);

  // Save user interests
  const handleInterests = (e) => {
    e.preventDefault();
    const interests = {
      surf: surf,
      fitness: fitness,
      volley: volley,
      paddle: paddle,
      climbing: climbing,
      running: running,
      football: football,
      trecking: trecking,
      museums: museums,
      bookstores: bookstores,
      theaters: theaters,
      movies: movies,
      guidedVisits: guidedVisits,
      concerts: concerts,
      parks: parks,
      ruralTourism: ruralTourism,
    };
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
    history.push('/infostep3');
  };

  return (
    <div className='info-step2'>
      <h2>Meet other digital nomads</h2>
      <form onSubmit={handleInterests}>
        <h4>Sport activities</h4>
        <input
          type='checkbox'
          name='Surf'
          id='Surf'
          checked={surf}
          value={surf}
          onChange={() => setSurf(!surf)}
        />{' '}
        Surf
        <input
          type='checkbox'
          name='Fitness'
          id='Fitness'
          checked={fitness}
          value={fitness}
          onChange={() => setFitness(!fitness)}
        />{' '}
        Fitness
        <input
          type='checkbox'
          name='Volley'
          id='Volley'
          checked={volley}
          value={volley}
          onChange={() => setVolley(!volley)}
        />{' '}
        Volley
        <input
          type='checkbox'
          name='Paddle'
          id='Paddle'
          checked={paddle}
          value={paddle}
          onChange={() => setPaddle(!paddle)}
        />{' '}
        Paddle
        <input
          type='checkbox'
          name='Climbing'
          id='Climbing'
          checked={climbing}
          value={climbing}
          onChange={() => setClimbing(!climbing)}
        />{' '}
        Climbing
        <input
          type='checkbox'
          name='Running'
          id='Running'
          checked={running}
          value={running}
          onChange={() => setRunning(!running)}
        />{' '}
        Running
        <input
          type='checkbox'
          name='Football'
          id='Football'
          checked={football}
          value={football}
          onChange={() => setFootball(!football)}
        />{' '}
        Football
        <input
          type='checkbox'
          name='Trecking'
          id='Trecking'
          checked={trecking}
          value={trecking}
          onChange={() => setTrecking(!trecking)}
        />{' '}
        Trecking
        <h4>Cultural activities</h4>
        <input
          type='checkbox'
          name='Museums'
          id='Museums'
          checked={museums}
          value={museums}
          onChange={() => setMuseums(!museums)}
        />{' '}
        Museums
        <input
          type='checkbox'
          name='Bookstores'
          id='Bookstores'
          checked={bookstores}
          value={bookstores}
          onChange={() => setBookstores(!bookstores)}
        />{' '}
        Bookstores
        <input
          type='checkbox'
          name='Theaters'
          id='Theaters'
          checked={theaters}
          value={theaters}
          onChange={() => setTheaters(!theaters)}
        />{' '}
        Theaters
        <input
          type='checkbox'
          name='Movies'
          id='Movies'
          checked={movies}
          value={movies}
          onChange={() => setMovies(!movies)}
        />{' '}
        Movies
        <input
          type='checkbox'
          name='Guided visits'
          id='Guided visits'
          checked={guidedVisits}
          value={guidedVisits}
          onChange={() => setGuidedVisits(!guidedVisits)}
        />{' '}
        Guided visits
        <input
          type='checkbox'
          name='Concerts'
          id='Concerts'
          checked={concerts}
          value={concerts}
          onChange={() => setConcerts(!concerts)}
        />{' '}
        Concerts
        <input
          type='checkbox'
          name='Parks'
          id='Parks'
          checked={parks}
          value={parks}
          onChange={() => setParks(!parks)}
        />{' '}
        Parks
        <input
          type='checkbox'
          name='Rural tourism'
          id='Rural tourism'
          checked={ruralTourism}
          value={ruralTourism}
          onChange={() => setRuralTourism(!ruralTourism)}
        />{' '}
        Rural tourism
        <InfoSteps step1 />
        <button type='submit'>Next</button>
      </form>
    </div>
  );
};

export default InfoStep2;
