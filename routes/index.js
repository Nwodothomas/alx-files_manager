#!/usr/bin/node

import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

const router = Router();

// Task 2 - First API
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

// Task 3 - Create a new user
router.post('/users', UsersController.postNew);

export default router;
