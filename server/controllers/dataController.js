import asyncHandler from 'express-async-handler';
import { getAllCities, getOneCity } from '../models/citiesSchema.js';

const getCities = asyncHandler(async (req, res) => {
  try {
    const data = await getAllCities();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});
const getCityByName = asyncHandler(async (req, res) => {
  try {
    let param = req.params.city;
    const data = await getOneCity(param);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

export { getCities, getCityByName };
