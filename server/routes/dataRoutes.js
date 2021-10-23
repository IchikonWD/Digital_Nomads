import express from 'express';
import { getCities, getCityByName } from '../controllers/dataController.js'
const router = express.Router();

router.get('/', getCities);
router.get('/:city', getCityByName);


export default router;
