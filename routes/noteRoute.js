import  { Router } from 'express';
const router = new Router();

import {
    getNotes,
    createNote,
    getNote,
    deleteNote,
    isLikedNote,
    likeNote,
    unlikeNote,
    getNoteLikes
} from '../controllers/noteController.js';

import {
    authenticateForApi
} from '../middlewares/authMiddleWare.js';

router.route('/')
    .get(authenticateForApi, getNotes)
    .post(authenticateForApi, createNote);

router.route('/:id')
    .get(authenticateForApi, getNote)
    .delete(authenticateForApi, deleteNote);

router.route('/:id/islike')
    .get(authenticateForApi, isLikedNote);

router.route('/:id/like')
    .put(authenticateForApi, likeNote);

router.route('/:id/unlike')
    .put(authenticateForApi, unlikeNote);

router.route('/:id/likes')
    .get(authenticateForApi, getNoteLikes);

export default router;