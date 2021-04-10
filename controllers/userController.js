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

exports.deleteAllUsers = async (req, res) => {
  await User.deleteMany();

  res.status(200).json({
    message: "successfully deleted",
  });
};
