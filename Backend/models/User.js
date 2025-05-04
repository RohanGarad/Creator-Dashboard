const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For password hashing
const validator = require('validator'); // For email validation

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3, // Minimum length for username
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, 'Please enter a valid email'], // Email validation
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum length for password
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    credits: {
      type: Number,
      default: 0,
    },
    lastLogin: { 
      type: Date, 
    },
    profileCompleted: {
      type: Boolean,
      default: false,
    },
    savedPosts: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    ],
    recentActivity: [
      {
        type: { type: String },
        post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Password hashing before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with the stored password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
