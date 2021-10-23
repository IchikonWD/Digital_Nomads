import asyncHandler from 'express-async-handler';
import { getAllCities } from '../models/citiesSchema.js';

const getCities = asyncHandler(async (req, res) => {
    try {
        const data = await getAllCities()
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
})

export { getCities }