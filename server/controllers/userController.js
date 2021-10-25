import asyncHandler from 'express-async-handler';
import User from '../models/userSchema.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUsers = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      nickname: user.nickname,
      name: user.name,
      age: user.age,
      email: user.email,
      language: user.language,
      ocupation: user.ocupation,
      country: user.country,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
      message: 'Invalid email or password',
    });
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ nickname: req.user.nickname });

  if (user) {
    res.status(200).json({
      _id: user._id,
      nickname: user.nickname,
      name: user.name,
      age: user.age,
      email: user.email,
      language: user.language,
      ocupation: user.ocupation,
      country: user.country,
      avatar: user.avatar,
    });
  } else {
    res.status(404).json({
      message: 'No user found',
    });
  }
});

// @desc    Register new user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res.status(400).json({
      message: 'User already exists',
    });
  } else {
    const user = await User.create({
      name: name,
      email: email,
      password: password,
      nickname: name,
    });

    res.status(201).json({
      _id: user._id,
      nickname: user.name,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.nickname = req.body.nickname || user.nickname;
    user.name = req.body.name || user.name;
    user.age = req.body.age || user.age;
    user.email = req.body.email || user.email;
    user.language = req.body.language || user.language;
    user.ocupation = req.body.ocupation || user.ocupation;
    user.country = req.body.country || user.country;
    user.avatar = req.body.avatar || user.avatar;
    user.interests = req.body.interests || user.interests;
    user.cluster = req.body.cluster || user.cluster;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      nickname: updatedUser.nickname,
      name: updatedUser.name,
      age: updatedUser.age,
      email: updatedUser.email,
      language: updatedUser.language,
      ocupation: updatedUser.ocupation,
      country: updatedUser.country,
      avatar: updatedUser.avatar,
      interests: updatedUser.interests,
      cluster: updatedUser.cluster,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404).json({
      message: 'No user found',
    });
  }
});

export { authUsers, getUserProfile, registerUser, updateUserProfile };
