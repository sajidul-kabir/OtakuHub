const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: String,
    text: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//virtual populate
postSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "_post",
  localField: "_id",
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
