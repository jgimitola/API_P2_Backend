import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  img_url: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model('Post', schema);

export default Post;
