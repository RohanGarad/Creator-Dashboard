const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/verifyToken'); // ✅ Ensure this file exists and verifies JWT
const authenticate = require('../middleware/verifyToken');
const User = require('../models/User');

router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'recentActivity.post',
        select: 'title link'
      })
      .populate({
        path: 'savedPosts',
        select: 'title link'
      });

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Format activity strings
    const formattedActivity = user.recentActivity.map((act) => {
      return act.post
        ? `${act.type} - ${act.post.title}`
        : `${act.type} - Unknown post`;
    });

    res.json({
      username: user.username,
      credits: user.credits,
      recentActivity: formattedActivity,
      savedPosts: user.savedPosts
    });
  } catch (err) {
    console.error('Dashboard Error:', err);
    res.status(500).json({ message: 'Failed to load dashboard data.' });
  }
});

router.post('/complete-profile', authenticate, async (req, res) => {
  const user = req.user;
  if (!user.profileCompleted) {
    user.credits += 20; // Award 20 credits for profile completion
    user.profileCompleted = true;
    await user.save();
    return res.status(200).json({ message: 'Profile completed and credits awarded.' });
  }
  res.status(400).json({ message: 'Profile already completed.' });
});


module.exports = router;
