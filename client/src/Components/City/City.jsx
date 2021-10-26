import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../Contexts/userContext';

const City = ({ history, match }) => {
  const { user } = useContext(UserContext);
  const [cityName, setCityName] = useState('');
  const [coworkingRating, setCoworkingRating] = useState(1);
  const [internetRating, setInternetRating] = useState(1);
  const [safetyRating, setSafetyRating] = useState(1);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [Reviews, setReviews] = useState([]);
  const [sunnyDays, setSunnyDays] = useState('');
  const [livingCost, setLivingCost] = useState('');
  const [livingCostMoney, setLivingCostMoney] = useState('');
  const [reviewing, setReviewing] = useState(false);

  useEffect(() => {
    const nycCost = 1366.67;
    const cityCost = nycCost * (livingCost / 100);
    setLivingCostMoney(cityCost.toFixed(2));
  }, [livingCostMoney, livingCost]);

  useEffect(() => {
    const city = match.params.id;
    setCityName(city);
  }, [match.params.id]);

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `http://localhost:5000/api/cities/${cityName}`;
        const result = await axios(url);
        const {
          coworkingSpaceRating,
          description,
          image,
          internetConnectionRating,
          overallSafetyRating,
          reviews = [],
        } = result.data.data;
        setCoworkingRating(coworkingSpaceRating);
        setDescription(description);
        setImage(image);
        setInternetRating(internetConnectionRating);
        setSafetyRating(overallSafetyRating);
        setReviews(reviews);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    async function fetchSecondData() {
      try {
        const url = `http://localhost:5000/api/data/${cityName}`;
        const result = await axios(url);
        const { cost_living_index, sunny_days } = result.data[0];
        setLivingCost(cost_living_index);
        setSunnyDays(sunny_days);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSecondData();
  }, [cityName]);

  const handleButton = async (e) => {
    e.preventDefault();
    setReviewing(!reviewing);
  };

  const handleSendButton = async (e) => {
    e.preventDefault();
    setReviewing(!reviewing);
  };

  if (reviewing === true) {
    return (
      <div>
        <h2>Tell your experience and help other nomads like you</h2>
        <h2>Rate the following items</h2>
        <form>
          <div className='internet_connection'>
            <h4>Internet connection</h4>
            <i className='fas fa-wifi'></i>
            <i className='fas fa-wifi'></i>
            <i className='fas fa-wifi'></i>
            <i className='fas fa-wifi'></i>
            <i className='fas fa-wifi'></i>
          </div>
          <div className='overall_safety'>
            <h4>Overall safety</h4>
            <i className='fas fa-meh-blank'></i>
            <i className='fas fa-meh-blank'></i>
            <i className='fas fa-meh-blank'></i>
            <i className='fas fa-meh-blank'></i>
            <i className='fas fa-meh-blank'></i>
          </div>
          <div className='coworking_spaces'>
            <h4>Coworking spaces near you?</h4>
            <i className='fas fa-suitcase'></i>
            <i className='fas fa-suitcase'></i>
          </div>
          <button onClick={handleSendButton}>Send</button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <img src={image} alt={`${cityName}`} />
        <h2>About {cityName}</h2>
        <p>{description}</p>
        <button onClick={handleButton}>Write a Review</button>

        <div>
          <i className='fas fa-wifi'></i>
          <span>Internet connection speed</span>
          <span>{internetRating}/5</span>
        </div>
        <div>
          <i className='fas fa-meh-blank'></i>
          <span>Safety</span>
          <span>{safetyRating}/5</span>
        </div>
        <div>
          <i className='fas fa-suitcase'></i>
          <span>Coworking spaces nearby</span>
          <span>{coworkingRating === 1 ? 'Yes' : 'No'}</span>
        </div>
        <div>
          <i className='fas fa-sun'></i>
          <span>Sunny days a year</span>
          <span>{sunnyDays}</span>
        </div>
        <div>
          <i className='fas fa-suitcase'></i>
          <span>Cost of living</span>
          <span> {livingCostMoney}$</span>
        </div>

        <div className='city__reviews'>
          <h3>Reviews</h3>
          {Reviews.map((review) => (
            <div key={review._id}>
              <img
                src={`http://localhost:5000${user.avatar}`}
                alt={`${user.name} Avatar`}
              />
              <span>{user.name} </span>
              <span>
                wrote a review on
                {' (' +
                  review.createdAt.slice(8, 10) +
                  '/' +
                  review.createdAt.slice(5, 7) +
                  ')'}
              </span>
              <p>{review.ratings.internetConnection}/5</p>
              <span>{review.ratings.overallSafety}/5</span>
              <span>
                {review.ratings.coworkingSpace === true ? 'Yes' : 'No'}
              </span>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default City;
