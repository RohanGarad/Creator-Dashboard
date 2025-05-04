// routes/protected.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const awardDailyLogin = require('../middleware/awardDailyLogin');

router.use(authenticate);
router.use(awardDailyLogin);

// Define your protected routes here

module.exports = router;
