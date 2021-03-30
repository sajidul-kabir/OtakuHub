const Post = require("../models/postModel");

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find();

  res.status(200).json({
    message: "successful",
    number_of_posts: posts.length,
    data: {
      posts,
    },
  });
};
exports.CreateNewPost = async (req, res) => {
  const newPost = await Post.create(req.body);

  res.status(201).json({
    message: "successful",
    data: {
      newPost,
    },
  });
};

exports.getAPost = async (req, res) => {
  const post = await Post.findById(req.params.postId).populate({
    path: "comments",
    select: "text -_post",
  });

  res.status(200).json({
    message: "successful",
    data: {
      post,
    },
  });
};
