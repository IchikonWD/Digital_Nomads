import express from 'express';
import {
  authUsers,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUserInterests,
} from '../controllers/userController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', authUsers);
router.get('/profile', protect, getUserProfile);
router.get('/interests', getUserInterests);
router.put('/profile', protect, updateUserProfile);

export default router;
