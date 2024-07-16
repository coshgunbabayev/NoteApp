import express, { Router } from 'express';
const router = new Router();

import {
    getIndexPage,
    getAccountPage
} from '../controllers/pageController.js';

import {
    authenticateForPage
} from '../middlewares/authMiddleWare.js';

router.route('/')
    .get(authenticateForPage, getIndexPage);

router.route('/account')
    .get(getAccountPage);

export default router;