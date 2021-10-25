import express from 'express';
import {
  getCities,
  getCityByName,
  createReview,
} from '../controllers/cityController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getCities);
router.get('/:name', getCityByName);
router.post('/:name/reviews', protect, createReview);

export default router;
