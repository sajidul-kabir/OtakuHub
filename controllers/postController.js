const Post = require("../models/postModel");
const Community = require("../models/communityModel");

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

exports.deleteAllPosts = async (req, res) => {
  await Post.deleteMany();

  res.status(200).json({
    message: "successfully deleted",
  });
};
