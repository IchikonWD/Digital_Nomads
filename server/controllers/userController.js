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
      lastName: user.lastName,
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
      lastName: user.lastName,
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
  const {
    nickname,
    name,
    lastName,
    age,
    email,
    language,
    ocupation,
    country,
    avatar,
    password,
  } = req.body;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res.status(400).json({
      message: 'User already exists',
    });
  } else {
    const user = await User.create({
      nickname: nickname,
      name: name,
      lastName: lastName,
      age: age,
      email: email,
      language: language,
      ocupation: ocupation,
      country: country,
      avatar: avatar,
      password: password,
    });

    res.status(201).json({
      _id: user._id,
      nickname: user.nickname,
      name: user.name,
      lastName: user.lastName,
      age: user.age,
      email: user.email,
      language: user.language,
      ocupation: user.ocupation,
      country: user.country,
      avatar: user.avatar,
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
    user.lastName = req.body.lastName || user.lastName;
    user.age = req.body.age || user.age;
    user.email = req.body.email || user.email;
    user.language = req.body.language || user.language;
    user.ocupation = req.body.ocupation || user.ocupation;
    user.country = req.body.country || user.country;
    user.avatar = req.body.avatar || user.avatar;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      nickname: updatedUser.nickname,
      name: updatedUser.name,
      lastName: updatedUser.lastName,
      age: updatedUser.age,
      email: updatedUser.email,
      language: updatedUser.language,
      ocupation: updatedUser.ocupation,
      country: updatedUser.country,
      avatar: updatedUser.avatar,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404).json({
      message: 'No user found',
    });
  }
});

export { authUsers, getUserProfile, registerUser, updateUserProfile };
