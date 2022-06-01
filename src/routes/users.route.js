import express from 'express';

import UserController from '../controllers/User.controller.js';

const router = express.Router();

router.post('/login', UserController.login);

router.post('/', UserController.register);

export default router;
