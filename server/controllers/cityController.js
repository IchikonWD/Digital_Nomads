import asyncHandler from 'express-async-handler';
import Cities from '../models/citySchema.js';

// @desc   Get all cities
// @route GET /api/cities/
// @access Public

const getCities = asyncHandler(async (req, res) => {
  const cities = await Cities.find();

  if (cities) {
    res.status(200).json({
      success: true,
      cities,
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'No cities found',
    });
  }
});

// @desc   Get One city
// @route GET /api/cities/:id
// @access Public

const getCityByName = asyncHandler(async (req, res) => {
  const city = await Cities.findOne({ name: req.params.name });

  if (city.includes('_')) {
    city = city.replace(/_/g, ' ');
    city = city.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  } else {
    city = city.charAt(0).toUpperCase() + city.substr(1).toLowerCase();
  }

  if (city) {
    console.log(city, 'city');
    res.status(200).json({
      success: true,
      data: city,
    });
  } else {
    return res.status(400).json({ success: false, message: 'City not found' });
  }
});

// @desc Create new review
// @route POST /api/cities/:id/reviews
// @access Private

const createReview = asyncHandler(async (req, res) => {
  const { ratings, comment, user } = req.body;
  const city = await Cities.findOne({ name: req.params.name });
  if (city) {
    const alreadyReviewed = city.reviews.find(
      (r) => r.user.toString() === user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this city',
      });
    }
    const review = {
      ratings: {
        internetConnection: ratings.internetConnection,
        overallSafety: ratings.overallSafety,
        coworkingSpace: ratings.coworkingSpace,
      },
      comment,
      city: req.params.name,
      user: user._id,
    };

    city.reviews.push(review);

    city.numReviews = city.reviews.length;

    city.rating =
      city.reviews.reduce((acc, curr) => {
        return (
          acc +
          curr.ratings.internetConnection +
          curr.ratings.overallSafety +
          (curr.ratings.coworkingSpace === true ? 1 : 0)
        );
      }, 0) / city.reviews.length;

    city.internetConnectionRating =
      city.reviews.reduce((acc, curr) => {
        return acc + curr.ratings.internetConnection;
      }, 0) / city.reviews.length;

    city.overallSafetyRating =
      city.reviews.reduce((acc, curr) => {
        return acc + curr.ratings.overallSafety;
      }, 0) / city.reviews.length;

    city.coworkingSpaceRating =
      city.reviews.reduce((acc, curr) => {
        return acc + (curr.ratings.coworkingSpace === true ? 1 : 0);
      }, 0) / city.reviews.length;

    await city.save();
    res
      .status(201)
      .json({ success: true, message: 'Review created successfully' });
  } else {
    return res.status(404).json({ success: false, message: 'City not found' });
  }
});

export { getCities, getCityByName, createReview };
