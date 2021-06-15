const Post = require("../models/postModel");
const Community = require("../models/communityModel");
const User = require("../models/userModel");

exports.getAllPosts = async (req, res) => {
  let filter = {};
  if (req.params.slug) {
    const community = Community.findOne({ slug: req.params.slug });
    filter = { _community: (await community)._id };
  }
  const posts = await Post.find(filter);
  res.status(200).json({
    message: "successful",
    number_of_posts: posts.length,
    data: {
      posts,
    },
  });
};

exports.CreateNewPost = async (req, res) => {
  if (!req.body._community) {
    const community = Community.findOne({ slug: req.params.slug });
    req.body._community = (await community)._id;
  }
  if (!req.body._user) {
    req.body._user = req.user._id;
  }
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

exports.upvoteAPost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user._id;
  const isUpvoted = req.user.upvotes && req.user.upvotes.includes(postId);
  const isDownvoted = req.user.downvotes && req.user.downvotes.includes(postId);

  let option;
  if (!isUpvoted) {
    option = "$addToSet";
  } else option = "$pull";
  req.user = await User.findByIdAndUpdate(
    userId,
    {
      [option]: { upvotes: postId },
    },
    { new: true }
  );
  let post = await Post.findByIdAndUpdate(
    postId,
    {
      [option]: { upvotes: userId },
    },

    { new: true }
  );

  if (isDownvoted) {
    req.user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { downvotes: postId },
      },
      { new: true }
    );
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { downvotes: userId },
      },

      { new: true }
    );
  }

  res.status(200).json({
    message: "successful",
    number_of_upvotes: post.upvotes.length,
    data: {
      post,
      user: req.user,
    },
  });
};

exports.downvoteAPost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user._id;
  const isDownvoted = req.user.downvotes && req.user.downvotes.includes(postId);
  const isUpvoted = req.user.upvotes && req.user.upvotes.includes(postId);
  let option;
  if (!isDownvoted) {
    option = "$addToSet";
  } else option = "$pull";
  req.user = await User.findByIdAndUpdate(
    userId,
    {
      [option]: { downvotes: postId },
    },
    { new: true }
  );
  let post = await Post.findByIdAndUpdate(
    postId,
    {
      [option]: { downvotes: userId },
    },
    { new: true }
  );
  if (isUpvoted) {
    req.user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { upvotes: postId },
      },
      { new: true }
    );
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { upvotes: userId },
      },

      { new: true }
    );
  }
  res.status(200).json({
    message: "successful",
    number_of_downvotes: post.downvotes.length,
    data: {
      post,
      user: req.user,
    },
  });
};

exports.deleteAllPosts = async (req, res) => {
  await Post.deleteMany();
  res.status(204).json({
    message: "successfully deleted",
  });
};

exports.deleteAPost = async (req, res) => {
  await Post.deleteOne({ _id: req.params.postId });
  res.status(204).json({
    message: "successfully deleted",
  });
};
