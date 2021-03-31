const Comment = require("../models/commentModel");

exports.getAllComments = async (req, res) => {
  let filter = {};
  if (req.params.postId) filter = { _post: req.params.postId };

  const comments = await Comment.find(filter);

  res.status(200).json({
    message: "successful",
    number_of_comments: comments.length,
    data: {
      comments,
    },
  });
};

exports.CreateNewComment = async (req, res) => {
  if (!req.body._post) req.body._post = req.params.postId;

  const newComment = await Comment.create(req.body);

  res.status(201).json({
    message: "successful",
    data: {
      newComment,
    },
  });
};

exports.deleteAllComments = async (req, res) => {
  await Comment.deleteMany();

  res.status(200).json({
    message: "successfully deleted",
  });
};
