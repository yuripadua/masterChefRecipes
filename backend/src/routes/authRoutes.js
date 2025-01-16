
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registration Route
router.post('/register', async (req, res) => {
  try {
    const { email, password, passwordConfirm } = req.body;

    // Check if passwords match
    if (password !== passwordConfirm) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    // Generate password hash
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Save new user to the database
    const newUser = new User({
      email,
      passwordHash,
    });
    await newUser.save();

    return res.json({ message: 'Registration successful!' });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ error: 'Server error.' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    // Compare provided password with stored hash
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    // Generate a JWT if credentials are valid
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2h', // Token expires in 2 hours
    });

    return res.json({ message: 'Login successful!', token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
