import asyncHandler from 'express-async-handler';
import { Cities, Review } from '../models/citySchema.js';

// @desc   Get all cities
// @route GET /api/cities/
// @access Public

const getCities = asyncHandler(async (req, res) => {
  const cities = await Cities.find();
  res.json(cities);
});

// @desc   Get One city
// @route GET /api/cities/:id
// @access Public

const getCityByName = asyncHandler(async (req, res) => {
  const city = await Cities.findOne({ name: req.params.name });
  res.json(city);
});

// @desc Create new review
// @route POST /api/cities/:id/reviews
// @access Public

const createReview = asyncHandler(async (req, res) => {});

export { getCities, getCityByName };
