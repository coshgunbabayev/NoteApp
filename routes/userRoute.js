import  { Router } from 'express';
const router = new Router();

import {
    createUser,
    loginUser,
    getCurrentUser,
    getUser,
    followUser,
    unfollowUser,
    removeFollower,
    getUserFollowing,
    getUserFollowers,
    getUserNotes,
} from '../controllers/userController.js';

import {
    authenticateForApi
} from '../middlewares/authMiddleWare.js';

router.route('/signup')
    .post(createUser);

router.route('/login')
    .post(loginUser);

router.route('/')
    .get(authenticateForApi, getCurrentUser);

router.route('/:username')
    .get(authenticateForApi, getUser);

router.route('/:username/follow')
    .put(authenticateForApi, followUser);

router.route('/:username/unfollow')
    .put(authenticateForApi, unfollowUser);

router.route('/:username/remove')
    .put(authenticateForApi, removeFollower);

router.route('/:username/following')
    .get(authenticateForApi, getUserFollowing);

router.route('/:username/followers')
    .get(authenticateForApi, getUserFollowers);

router.route('/:username/notes')
    .get(authenticateForApi, getUserNotes);

export default router;