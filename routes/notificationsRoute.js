import  { Router } from 'express';
const router = new Router();

import {
    getNotifications
} from '../controllers/notificationsController.js';

import {
    authenticateForApi
} from '../middlewares/authMiddleWare.js';

router.route('/')
    .get(authenticateForApi, getNotifications);

export default router;