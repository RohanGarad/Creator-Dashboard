const mongoose = require('mongoose');

const savedExternalSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    source: { 
      type: String, 
      required: true,  // 'Reddit' or 'Twitter'
    },
    externalId: { 
      type: String, 
      required: true,  // e.g., 'tw1' or 'abc123'
    },
    title: { 
      type: String, 
      required: true,  // Optional: Add validation if necessary
    },
    url: { 
      type: String, 
      required: true,  // Optional: Add validation if necessary
    },
  },
  { 
    timestamps: true, // Automatically handle createdAt and updatedAt
  }
);

// Indexing for better performance
savedExternalSchema.index({ userId: 1, source: 1, externalId: 1 });

module.exports = mongoose.model('SavedExternalPost', savedExternalSchema);
