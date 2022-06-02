import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  post_id: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
  action: {
    type: String,
    required: true,
  },
});

const ActivityRegister = mongoose.model('ActivityRegister', schema);

export default ActivityRegister;
