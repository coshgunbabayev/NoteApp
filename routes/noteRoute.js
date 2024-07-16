import express, { Router } from 'express';
const router = new Router();

import {
    getNotes,
    createNote,
    deleteNote
} from '../controllers/noteController.js';

import {
    authenticateForApi
} from '../middlewares/authMiddleWare.js';

router.route('/')
    .get(authenticateForApi, getNotes)
    .post(authenticateForApi, createNote);

router.route('/:id')
    .delete(authenticateForApi, deleteNote);

export default router;