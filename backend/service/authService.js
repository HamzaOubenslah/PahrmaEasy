import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const JWT_REFRESH=process.env.JWT_REFRESH || 'your_refresh_key;'

export const createUser = async ({ name, email, password, profileImage }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(404,'User already exists');
  const user = new User({ name, email, password, profileImage });
  await user.save();
  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401,'Invalid credentials');
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
  return { user, token };
};

export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) throw new Error(404,'User not found');
  return user;
};

export const updateUser = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
  if (!user) throw new Error(404,'User not found');
  return user;
};

export const refreshAccessToken = async (refreshToken) => {
  const decoded = jwt.verify(refreshToken, JWT_REFRESH);
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return jwt.sign(
    { id: user._id, email: user.email, roles: user.roles },
    access_token,
    { expiresIn: '1d' }
  );
};
