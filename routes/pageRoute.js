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
    getSettingsPage,
    getProfileSettingsPage
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

router.route('/settings')
    .get(authenticateForPage, getSettingsPage);

router.route('/settings/profile')
    .get(authenticateForPage, getProfileSettingsPage);

export default router;