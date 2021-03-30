const Comment = require("../models/commentModel");

exports.getAllComments = async (req, res) => {
  const comments = await Comment.find();

  res.status(200).json({
    message: "successful",
    number_of_comments: comments.length,
    data: {
      comments,
    },
  });
};
exports.CreateNewComment = async (req, res) => {
  const newComment = await Comment.create(req.body);

  res.status(201).json({
    message: "successful",
    data: {
      newComment,
    },
  });
};
