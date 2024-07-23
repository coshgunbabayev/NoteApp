import { Router } from 'express';
const router = new Router();

import {
    updateUserDetails,
    updateUserProfilePicture,
    deleteUserProfilePicture,
    updateUserBio
} from '../controllers/settingsController.js';

import {
    authenticateForApi
} from '../middlewares/authMiddleWare.js';

import { ProfilePicture } from '../middlewares/mediaMiddleWare.js';

router.route('/userdetails')
    .put(authenticateForApi, updateUserDetails);

router.route('/profilepicture')
    .put(authenticateForApi, ProfilePicture.single('profilepicture'), updateUserProfilePicture)
    .delete(authenticateForApi, deleteUserProfilePicture);

router.route('/bio')
    .put(authenticateForApi, updateUserBio);

export default router;