import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Contexts/userContext';

const City = ({ location, match, history }) => {
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
  const [reviewers, setReviewers] = useState([]);
  const [reviewersName, setReviewersName] = useState([]);
  const [reviewersAvatar, setReviewersAvatar] = useState([]);
  const [reviewing, setReviewing] = useState(false);
  const [combinedReview, setCombinedReview] = useState([]);

  // Send Review States
  const [completeReview, setCompleteReview] = useState({});
  const [internetReview, setInternetReview] = useState(0);
  const [safetyReview, setSafetyReview] = useState(0);
  const [coworkingReview, setCoworkingReview] = useState({});
  const [comment, setComment] = useState('');

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
        const url = `/api/cities/${cityName}`;
        const result = await axios.get(url);
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
        if (reviews.length > 0) {
          const reviewers = reviews.map((review) => review.user);
          setReviewers(reviewers);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();

    async function fetchSecondData() {
      try {
        const url = `/api/data/${cityName}`;
        const result = await axios.get(url);
        const { cost_living_index, sunny_days } = result.data[0];
        setLivingCost(cost_living_index);
        setSunnyDays(sunny_days);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSecondData();
  }, [cityName]);

  useEffect(() => {
    if (reviewers.length > 0) {
      async function fetchData() {
        const usersFromReviews = reviewers;
        try {
          const url = `/api/users/names`;
          const result = await axios.post(url, usersFromReviews);
          const reviewersName = result.data.map((user) => user);
          setReviewersName(reviewersName);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }
    if (reviewers.length > 0) {
      async function fetchData() {
        const usersFromReviews = reviewers;
        try {
          const url = `/api/users/avatars`;
          const result = await axios.post(url, usersFromReviews);
          const reviewersAvatar = result.data.map((user) => user);
          setReviewersAvatar(reviewersAvatar);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }
  }, [reviewers]);

  useEffect(() => {
    if (reviewersName.length > 0 && reviewersAvatar.length > 0) {
      const combinedReview = reviewersName.map((user, index) => {
        const userName = user;
        const userAvatar = reviewersAvatar[index];
        const review = Reviews[index];
        return { userName, review, userAvatar };
      });
      setCombinedReview(combinedReview);
    }
  }, [reviewersName, Reviews, reviewersAvatar]);

  useEffect(() => {
    const review = {
      user: {
        _id: user._id,
      },
      ratings: {
        internetConnection: internetReview,
        overallSafety: safetyReview,
        coworkingSpace: coworkingReview,
      },
      comment: comment,
    };
    setCompleteReview(review);
  }, [internetReview, safetyReview, coworkingReview, comment, user._id]);

  const handleButton = async (e) => {
    e.preventDefault();
    setReviewing(!reviewing);
  };

  const handleInternet1 = async (e) => {
    e.preventDefault();
    setInternetReview(1);
  };

  const handleInternet2 = async (e) => {
    e.preventDefault();
    setInternetReview(2);
  };

  const handleInternet3 = async (e) => {
    e.preventDefault();
    setInternetReview(3);
  };

  const handleInternet4 = async (e) => {
    e.preventDefault();
    setInternetReview(4);
  };

  const handleInternet5 = async (e) => {
    e.preventDefault();
    setInternetReview(5);
  };

  const handleSafety1 = async (e) => {
    e.preventDefault();
    setSafetyReview(1);
  };

  const handleSafety2 = async (e) => {
    e.preventDefault();
    setSafetyReview(2);
  };

  const handleSafety3 = async (e) => {
    e.preventDefault();
    setSafetyReview(3);
  };

  const handleSafety4 = async (e) => {
    e.preventDefault();
    setSafetyReview(4);
  };

  const handleSafety5 = async (e) => {
    e.preventDefault();
    setSafetyReview(5);
  };

  const handleCoworking = async (e) => {
    e.preventDefault();
    setCoworkingReview(false);
  };
  const handleCoworking2 = async (e) => {
    e.preventDefault();
    setCoworkingReview(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (completeReview === '') {
      alert('Please rate your experience');
    } else if (internetReview === 0) {
      alert('Please rate your internet connection');
    } else if (safetyReview === 0) {
      alert('Please rate your safety');
    } else if (comment === '') {
      alert('Please write a comment');
    } else {
      console.log('Submited!');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      try {
        const url = `/api/cities/${cityName}/reviews`;
        const result = await axios.post(url, completeReview, config);
        console.log(result, 'Review enviada correctamente');
        setReviewing(!reviewing);
        history.push(`/thanks`);
      } catch (error) {
        console.log(error);
        setReviewing(!reviewing);
        history.push(`/thanks`);
      }
    }
  };

  if (reviewing === true && user.isLoggedIn === true) {
    return (
      <div className='review'>
        <header className='review__header'>
          <i className='fas fa-chevron-left review__header__icon'>
            <button className='hidden_button' onClick={handleButton}></button>
          </i>
          <h1 className='review__header__title'>{cityName}</h1>
          <i className='far fa-heart review__header__icon2'></i>
        </header>
        <form className='review__form' onSubmit={handleSubmit} method='POST'>
          <h2 className='review__form__title1'>
            Share your experience and <br />
            help other nomads like you
          </h2>
          <input
            type='text'
            name='comment'
            id='comment'
            placeholder='Type to write'
            className='review__form__input1'
            onChange={(e) => setComment(e.target.value)}
          />
          <h2 className='review__form__title2'>Rate the following items</h2>
          <div className='review__form__container'>
            <h4 className='review__form__container__title'>
              Internet connection
            </h4>
            <button
              className='button_review_1 hidden_button'
              onClick={handleInternet1}
            >
              <img
                src={
                  internetReview === 1
                    ? '/assets/icons/internet1.png'
                    : '/assets/icons/internetFalse.png'
                }
                alt='internet'
              />
            </button>
            <button
              className='button_review_2 hidden_button'
              onClick={handleInternet2}
            >
              <img
                src={
                  internetReview === 2
                    ? '/assets/icons/internet2.png'
                    : '/assets/icons/internetFalse.png'
                }
                alt='internet'
              />
            </button>
            <button
              className='button_review_3 hidden_button'
              onClick={handleInternet3}
            >
              <img
                src={
                  internetReview === 3
                    ? '/assets/icons/internet3.png'
                    : '/assets/icons/internetFalse.png'
                }
                alt='internet'
              />
            </button>
            <button
              className='button_review_4 hidden_button'
              onClick={handleInternet4}
            >
              <img
                src={
                  internetReview === 4
                    ? '/assets/icons/internet4.png'
                    : '/assets/icons/internetFalse.png'
                }
                alt='internet'
              />
            </button>
            <button
              className='button_review_5 hidden_button'
              onClick={handleInternet5}
            >
              <img
                src={
                  internetReview === 5
                    ? '/assets/icons/internet5.png'
                    : '/assets/icons/internetFalse.png'
                }
                alt='internet'
              />
            </button>
          </div>
          <div className='review__form__container'>
            <h4 className='review__form__container__title'>Overall safety</h4>
            <button
              className='button_review_1 hidden_button'
              onClick={handleSafety1}
            >
              <img
                src={
                  safetyReview === 1
                    ? '/assets/icons/safety1.png'
                    : '/assets/icons/safetyFalse.png'
                }
                alt='safety'
              />
            </button>
            <button
              className='button_review_2 hidden_button'
              onClick={handleSafety2}
            >
              <img
                src={
                  safetyReview === 2
                    ? '/assets/icons/safety2.png'
                    : '/assets/icons/safetyFalse.png'
                }
                alt='safety'
              />
            </button>
            <button
              className='button_review_3 hidden_button'
              onClick={handleSafety3}
            >
              <img
                src={
                  safetyReview === 3
                    ? '/assets/icons/safety3.png'
                    : '/assets/icons/safetyFalse.png'
                }
                alt='safety'
              />
            </button>
            <button
              className='button_review_4 hidden_button'
              onClick={handleSafety4}
            >
              <img
                src={
                  safetyReview === 4
                    ? '/assets/icons/safety4.png'
                    : '/assets/icons/safetyFalse.png'
                }
                alt='safety'
              />
            </button>
            <button
              className='button_review_5 hidden_button'
              onClick={handleSafety5}
            >
              <img
                src={
                  safetyReview === 5
                    ? '/assets/icons/safety5.png'
                    : '/assets/icons/safetyFalse.png'
                }
                alt='safety'
              />
            </button>
          </div>
          <div className='review__form__container'>
            <h4 className='review__form__container__title'>
              Coworking spaces near you?
            </h4>
            <button
              className='button_review_true hidden_button'
              onClick={handleCoworking}
            >
              <img
                src={
                  coworkingReview === false
                    ? '/assets/icons/jobs1.png'
                    : '/assets/icons/jobsFalse.png'
                }
                alt='jobs'
              />
            </button>
            <button
              className='button_review_false hidden_button'
              onClick={handleCoworking2}
            >
              <img
                src={
                  coworkingReview === true
                    ? '/assets/icons/jobs2.png'
                    : '/assets/icons/jobsFalse.png'
                }
                alt='jobs'
              />
            </button>
          </div>
          <button
            className='primary_button review__form__button '
            type='submit'
          >
            Send
          </button>
        </form>
      </div>
    );
  } else if (reviewing === false) {
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
          {combinedReview.map((review) => (
            <div key={review.review._id}>
              <img
                src={`${review.userAvatar}`}
                alt={`${review.userName} Avatar`}
              />
              <span>{review.userName} </span>
              <span>
                wrote a review on
                {' (' +
                  review.review.createdAt.slice(8, 10) +
                  '/' +
                  review.review.createdAt.slice(5, 7) +
                  ')'}
              </span>
              <p>{review.review.ratings.internetConnection}/5</p>
              <span>{review.review.ratings.overallSafety}/5</span>
              <span>
                {review.review.ratings.coworkingSpace === true ? 'Yes' : 'No'}
              </span>
              <p>{review.review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2>You need to be logged in to write a review</h2>
        <Link to='/login'>
          <button>Go to Login</button>
        </Link>
      </div>
    );
  }
};

export default City;
