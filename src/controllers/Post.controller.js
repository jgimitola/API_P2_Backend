import PostModel from '../models/Post.model.js';

//Create post
const createPost = async (req, res, next) => {
    const { img_url, bio, author } = req.body;
    if (img_url && bio && author) {
        try {
            const post = new PostModel({
                img_url,
                bio,
                author
            });
            await post.save();
            return res.status(200).json({});
        } catch (error) {
            next(error);
        }
    }
}

export default { createPost };