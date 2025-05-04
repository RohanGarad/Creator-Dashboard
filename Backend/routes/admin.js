// routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Make sure this path is correct
const authenticate = require('../middleware/verifyToken'); // Make sure authenticate middleware is set
const isAdmin = require('../middleware/isAdmin');

// Endpoint to fetch all users
// routes/admin.js or wherever you placed it
router.get('/users', authenticate, isAdmin, async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });  

// Endpoint to update credits of a specific user
router.put('/users/:id/credits', authenticate, async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied.' });
    }

    const { credits } = req.body; // Get credits from request body
    const userId = req.params.id;

    // Update user credits
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { credits },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
