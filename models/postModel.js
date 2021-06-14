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
    _community: {
      type: mongoose.Schema.ObjectId,
      ref: "Community",
      required: [true, "A post must belong to a community"],
    },
    _user:{
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A post must belong to a user"],
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
