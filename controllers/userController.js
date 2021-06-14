const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    message: "successful",
    data: {
      users,
    },
  });
};

exports.getAUser = async (req, res) => {
  const user = await User.findById(req.params.userId).populate({
    path: "posts",
    select: "title text -_user",
  });

  res.status(200).json({
    message: "successful",
    data: {
      user,
    },
  });
};

exports.deleteAllUsers = async (req, res) => {
  await User.deleteMany();

  res.status(200).json({
    message: "successfully deleted",
  });
};
