import { Router } from 'express';
const router = new Router();

import {
    getIndexPage,
    getAccountPage,
    getUserPage,
    getNotePage,
    getUserFollowingPage,
    getUserFollowersPage,
    getNoteLikesPage,
    getNotificationsPage,
    getSettingsPage,
    getProfileSettingsPage,
    getPasswordSettingsPage
} from '../controllers/pageController.js';

import {
    authenticateForPage
} from '../middlewares/authMiddleWare.js';

router.route('/')
    .get(authenticateForPage, getIndexPage);

router.route('/account')
    .get(getAccountPage);

router.route('/user/:username')
    .get(authenticateForPage, getUserPage);

router.route('/note/:id')
    .get(authenticateForPage, getNotePage);

router.route('/user/:username/following')
    .get(authenticateForPage, getUserFollowingPage);

router.route('/user/:username/followers')
    .get(authenticateForPage, getUserFollowersPage);

router.route('/note/:id/likes')
    .get(authenticateForPage, getNoteLikesPage);

router.route('/notifications')
    .get(authenticateForPage, getNotificationsPage);

router.route('/settings')
    .get(authenticateForPage, getSettingsPage);

router.route('/settings/profile')
    .get(authenticateForPage, getProfileSettingsPage);

router.route('/settings/password')
    .get(authenticateForPage, getPasswordSettingsPage);

export default router;