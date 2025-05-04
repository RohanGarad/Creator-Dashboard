import mongoose from "mongoose";

const FeedSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      // Optional validation: e.g. min length of 5
      minlength: [5, "Content must be at least 5 characters long"],
    },
  },
  { timestamps: true } // Mongoose will automatically handle createdAt and updatedAt
);

// Indexing the author for optimized queries
FeedSchema.index({ author: 1 });

export default mongoose.model("Feed", FeedSchema);
