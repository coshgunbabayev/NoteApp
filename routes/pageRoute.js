import express, { Router } from 'express';
const router = new Router();

import {
    getIndexPage,
    getAccountPage
} from '../controllers/pageController.js';

router.route('/')
    .get(getIndexPage);

router.route('/account')
    .get(getAccountPage);

export default router;