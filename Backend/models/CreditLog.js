const mongoose = require('mongoose');

const creditLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true  // Ensures that a userId must be provided
  },
  action: {
    type: String,
    enum: ['login', 'profileComplete', 'daily-login', 'purchase'], // Add predefined actions
    required: true
  },
  points: {
    type: Number,
    required: true  // Ensure points are always provided
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
});

// Index userId to optimize queries searching by userId
creditLogSchema.index({ userId: 1 });

module.exports = mongoose.model('CreditLog', creditLogSchema);
