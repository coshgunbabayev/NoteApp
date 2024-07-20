import express, { Router } from 'express';
const router = new Router();

import {
    getIndexPage,
    getAccountPage,
    getUserPage,
    getUserFollowingPage,
    getUserFollowersPage
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

router.route('/user/:username/following')
    .get(authenticateForPage, getUserFollowingPage);

router.route('/user/:username/followers')
    .get(authenticateForPage, getUserFollowersPage);

export default router;