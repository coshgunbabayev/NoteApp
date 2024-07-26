import { Router } from 'express';
const router = new Router();

import {
    getNotifications,
    readAllNotifications,
    getUnreadNotificationsCount
} from '../controllers/notificationsController.js';

import {
    authenticateForApi
} from '../middlewares/authMiddleWare.js';

router.route('/')
    .get(authenticateForApi, getNotifications);

router.route('/read')
    .put(authenticateForApi, readAllNotifications)

router.route('/unread/count')
    .get(authenticateForApi, getUnreadNotificationsCount);

export default router;