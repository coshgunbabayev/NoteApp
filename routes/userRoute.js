import express, { Router } from 'express';
const router = new Router();

import {
    createUser,
    loginUser
} from '../controllers/userController.js';

router.route('/signup')
    .post(createUser)

router.route('/login')
    .post(loginUser)

export default router;