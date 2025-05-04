const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Models
require('./models/Post');

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // your React frontend
  credentials: true,
}));
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const creditRoutes = require('./routes/credits');
const feedRoutes = require('./routes/feed');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

// Route usage
app.use('/api/auth', authRoutes);
app.use('/api/credits', creditRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection failed', err));

// Test route
app.get('/', (req, res) => {
  res.send("API is running");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
