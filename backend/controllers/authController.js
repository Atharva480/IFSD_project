// POST /api/auth/users/:id/follow
exports.followUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const targetId = req.params.id;
    if (userId === targetId) return res.status(400).json({ message: 'Cannot follow yourself' });
    const user = await User.findById(userId);
    const target = await User.findById(targetId);
    if (!target) return res.status(404).json({ message: 'User not found' });
    if (user.following?.includes(targetId)) return res.status(400).json({ message: 'Already following' });
    user.following = [...(user.following || []), targetId];
    target.followers = [...(target.followers || []), userId];
    await user.save();
    await target.save();
    res.json({ following: user.following, followers: target.followers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/auth/users/:id/unfollow
exports.unfollowUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const targetId = req.params.id;
    if (userId === targetId) return res.status(400).json({ message: 'Cannot unfollow yourself' });
    const user = await User.findById(userId);
    const target = await User.findById(targetId);
    if (!target) return res.status(404).json({ message: 'User not found' });
    user.following = (user.following || []).filter(id => id.toString() !== targetId);
    target.followers = (target.followers || []).filter(id => id.toString() !== userId);
    await user.save();
    await target.save();
    res.json({ following: user.following, followers: target.followers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const User = require('../models/User');
// GET /api/auth/users/search?name=xxx
exports.searchUsers = async (req, res) => {
  try {
    const name = req.query.name || '';
    const users = await User.find({ name: { $regex: name, $options: 'i' } }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
