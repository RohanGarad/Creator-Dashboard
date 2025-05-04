const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/User');
const CreditLog = require('../models/CreditLog');

// Utility: Add credits
const awardCredits = async (userId, points, action) => {
  await User.findByIdAndUpdate(userId, { $inc: { credits: points } });

  const log = new CreditLog({
    userId,
    action,
    points
  });

  await log.save();
};

// 🔐 Protected route: User checks own credits
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('username credits');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ➕ Daily login = +5 points (awarded once per day)
router.post('/daily-login', verifyToken, async (req, res) => {
  try {
    const today = new Date().toDateString();

    const alreadyClaimed = await CreditLog.findOne({
      userId: req.user._id,
      action: 'daily-login',
      date: {
        $gte: new Date(today),
        $lte: new Date(today + ' 23:59:59')
      }
    });

    if (alreadyClaimed) {
      return res.json({ message: 'Already claimed daily login points' });
    }

    await awardCredits(req.user._id, 5, 'daily-login');

    res.json({ message: '5 points awarded for daily login' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Profile complete = +10 points (only once)
router.post('/profile-complete', verifyToken, async (req, res) => {
  try {
    const alreadyDone = await CreditLog.findOne({
      userId: req.user._id,
      action: 'profile-complete'
    });

    if (alreadyDone) {
      return res.status(400).json({ message: 'Profile completion credits already awarded' });
    }

    await awardCredits(req.user._id, 10, 'profile-complete');

    res.json({ message: '10 points awarded for profile completion' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 👑 Admin: View all users' credits
router.get('/all', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    const users = await User.find().select('username email credits');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
