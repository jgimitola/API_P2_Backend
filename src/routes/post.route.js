import express from 'express';

import PostController from '../controllers/Post.controller.js';
import ActivityRegisterController from '../controllers/ActivityRegister.controller.js';

const router = express.Router();

router.post('/', PostController.createPost);
router.get('/', PostController.getPost);
router.post('/like', ActivityRegisterController.createLike);
router.post('/save', ActivityRegisterController.createSave);
router.post('/comment', ActivityRegisterController.createComment);

export default router;