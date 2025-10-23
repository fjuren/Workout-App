import express from 'express';
import * as userController from '../controllers/userController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Get user profile settings for authenticated user
// router.get(
//   '/profile-settings',
//   authenticate,
//   userController.getProfileSettings
// );

// Save profile settings
router.post(
  '/profile-settings',
  authenticate,
  userController.saveProfileSettings
);

export default router;
