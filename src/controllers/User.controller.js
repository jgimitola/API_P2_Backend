import UserModel from '../models/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res, next) => {
  const {token} = req.body;
  if (token) {
    loginWithToken(req, res, next);
  } else {
    loginWithCredentials(req, res, next);
  }
};

const loginWithToken = async (req, res, next) => {
  const {token} = req.body;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const mongooseUser = await UserModel.findById(decoded.user_id);
      if (!mongooseUser) return res.status(400).json({error: 'User not found'});
      return res.status(200).json({});
    } catch (error) {
      next(error);
    }
  }
};


const loginWithCredentials = async (req, res, next) => {
  const {username, password} = req.body;
  if (username && password) {
    try {
      const mongooseUser = await UserModel.findById(username);
      if (!mongooseUser) return res.status(400).json({Error: 'User not found'});
      const user = await mongooseUser.toObject();
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({  user_id: user._id }, process.env.JWT_SECRET);
        return res.status(200).json({ token });
      }else{
        return res.status(400).json({Error: 'Password incorrect'});
      }
    } catch (error) {
      next(error);
    }
  }
};

const register = async (req, res, next) => {
  const { username, password, email, birthdate, bio } = req.body;
  if (username && password && email && birthdate && bio) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const user = new UserModel({
        username,
        password: hashPassword,
        email,
        birthdate,
        bio,
      });

      await user.save();

      //Create token
      const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET);

      return res.status(200).json({token});
    } catch (error) {
      next(error);
    }
  }
};

// get user_id by token
const getUserIDByToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.user_id;
  } catch (error) {
    return null;
  }
};

const getUserByToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const mongooseUser = await UserModel.findById(decoded.user_id);
    if (!mongooseUser) return null;
    return mongooseUser;
  } catch (error) {
    return null;
  }
};

export default {login, register, getUserIDByToken, getUserByToken};
