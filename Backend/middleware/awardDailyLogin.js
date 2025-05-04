const awardDailyLogin = async (req, res, next) => {
  try {
    const user = req.user;
    const today = new Date().setHours(0, 0, 0, 0);  // Start of the day
    const lastLogin = user.lastLogin ? new Date(user.lastLogin).setHours(0, 0, 0, 0) : null;

    // If the user hasn't logged in today, award 10 credits
    if (lastLogin !== today) {
      user.credits += 10;  // Award 10 credits for daily login
      user.lastLogin = new Date();  // Set today's date as last login
      await user.save();  // Save the updated user data
    }

    next();
  } catch (err) {
    console.error('Error in awardDailyLogin middleware:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = awardDailyLogin;
