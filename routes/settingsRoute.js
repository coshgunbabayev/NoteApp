import { Router } from 'express';
const router = new Router();

import {
    updateUserDetails,
    updateUserBio
} from '../controllers/settingsController.js';

import {
    authenticateForApi
} from '../middlewares/authMiddleWare.js';

router.route('/userdetails')
    .put(authenticateForApi, updateUserDetails)

router.route('/bio')
    .put(authenticateForApi, updateUserBio)

export default router;