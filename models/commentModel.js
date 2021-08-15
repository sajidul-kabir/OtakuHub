const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  _post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
    required: [true, "A comment must belong to a post"],
  },
});

// commentSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "_post",
//     select: "title text",
//   });
//   next();
// });

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
