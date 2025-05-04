const express = require('express');
const router = express.Router();
const Feed = require('../models/Feed');
const authenticate = require('../middleware/verifyToken');
const fetchRedditPosts = require('../services/redditService');
const fetchTwitterPosts = require('../services/twitterService');
const User = require('../models/User');
const { default: mongoose } = require('mongoose');
const SavedExternalPost = require('../models/SavedExternalPost');


// Combined Feed API
router.get('/', async (req, res) => {
  try {
    const redditPosts = await fetchRedditPosts();
    const twitterPosts = await fetchTwitterPosts();

    const combined = [...redditPosts, ...twitterPosts];
    // Sort by createdAt descending
    combined.sort((a, b) => b.createdAt - a.createdAt);

    res.json(combined);
  } catch (error) {
    console.error('Feed Error:', error);
    res.status(500).json({ message: 'Failed to fetch feed' });
  }
});

// @POST create a feed post (Protected)
router.post('/', authenticate, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Feed content is required" });
    }

    const newFeed = new Feed({
      content,
      author: req.user._id, // set from verifyToken
    });

    const savedFeed = await newFeed.save();
    res.status(201).json(savedFeed);
  } catch (err) {
    res.status(500).json({ message: "Error creating feed post" });
  }
});

// Save external post (Reddit/Twitter)
router.post('/save-external', authenticate, async (req, res) => {
  try {
    const { post } = req.body;
    const userId = req.user?.id; // Safely access the userId

    // Log userId to check its value
    console.log("User ID:", userId);

    if (!userId) {
      return res.status(400).json({ message: 'User not authenticated' });
    }

    const alreadySaved = await SavedExternalPost.findOne({
      userId,
      source: post.source,
      externalId: post.id,
    });

    if (alreadySaved) {
      return res.status(409).json({ message: 'Post already saved' });
    }

    const newSave = new SavedExternalPost({
      userId,
      source: post.source,
      externalId: post.id,
      title: post.title,
      url: post.url,
    });

    await newSave.save();
    res.status(201).json({ message: 'Saved successfully', data: newSave });

  } catch (err) {
    console.error('Error saving external post:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/interact', authenticate, async (req, res) => {
  try {
    
    // Check if user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized - user not attached' });
    }

    // Fetch the user document
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract postId from the request body
    const { postId } = req.body;

    // Validate if postId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid postId provided.' });
    }

    // Add the postId to recentActivity
    if (!user.recentActivity) user.recentActivity = [];
    
    user.recentActivity.push({
      type: 'interact', // Default action as 'interact'
      post: postId,
      date: new Date(),
    });

    // Save the user document
    await user.save();

    res.status(200).json({
      message: 'Interaction recorded successfully.',
    });
  } catch (err) {
    console.error('Error in /interact:', err);  // Log the full error object
    res.status(500).json({ message: 'Server error in interaction route', error: err.message });
  }
});

module.exports = router;