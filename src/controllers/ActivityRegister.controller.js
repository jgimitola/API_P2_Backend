import ActivityRegisterModel from '../models/ActivityRegister.model.js';
import { getUserIDByToken } from '../controllers/User.controller.js';

// create activity register
export const createActivityRegister = async (req, res, action) => {
    const {post_id} = req.body;
    const {token} = req.headers;
    const {user_id} = await getUserIDByToken(token);
    try {
        if(post_id && user_id) {
            if (action === 'comment') {
                const {comment} = req.body;
                if (comment) {
                    await ActivityRegisterModel.create({
                        post_id,
                        user_id,
                        comment
                    });
                    return res.status(200).json({});
                }else{
                    return res.status(400).json({
                        message: 'comment is required'
                    });
                }
            }else{  
                await ActivityRegisterModel.create({
                    post_id,
                    user_id,
                    action
                });
                return res.status(200).json({});
            }
        }
    } catch (error) {
        res.status(400).send(error);
    }   
};

//create like activity register
const createLike = async (req, res) => {
    await createActivityRegister(req, res, 'like');
};

//create comment activity register
const createComment = async (req, res) => {
    await createActivityRegister(req, res, 'comment');
};

//create save activity register
const createSave = async (req, res) => {
    await createActivityRegister(req, res, 'save');
};

export default {
    createLike,
    createComment,
    createSave
};