import express from 'express';
import { getCities, getCityByName } from '../controllers/cityController.js';

const router = express.Router();

router.get('/', getCities);
router.get('/:name', getCityByName);

export default router;
