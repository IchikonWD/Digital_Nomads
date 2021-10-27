import express from 'express';
import {
  authUsers,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUserNames,
  getUserAvatars,
} from '../controllers/userController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/names', getUserNames);
router.post('/avatars', getUserAvatars);
router.post('/login', authUsers);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

export default router;
