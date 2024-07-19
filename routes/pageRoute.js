import express, { Router } from 'express';
const router = new Router();

import {
    getIndexPage,
    getAccountPage,
    getUserPage
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

export default router;