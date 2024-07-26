import  { Router } from 'express';
const router = new Router();

import {
    getNotifications,
    readAllNotifications
} from '../controllers/notificationsController.js';

import {
    authenticateForApi
} from '../middlewares/authMiddleWare.js';

router.route('/')
    .get(authenticateForApi, getNotifications);

router.route('/read')
    .put(authenticateForApi, readAllNotifications)

export default router;