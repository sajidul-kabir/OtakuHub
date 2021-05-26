const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    httpOnly: true,
  });
  res.status(statusCode).json({
    message: "succesful",
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  const newUser = await User.create({
    name,
    email, // to protect admin route
    password,
    role,
  });

  createSendToken(newUser, 201, res);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      message: "provide an email and password",
    });
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.json({
      message: "Incorrect email or password",
    });
  }
  createSendToken(user, 200, res);
};

exports.protectRoute = async (req, res, next) => {
  // 1) check if the header contains a token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.json({
      message: "Unauthorized",
    });
  }

  // 2) Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if the token belonging to the user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return res.json({
      message: "The user no longer exist",
    });
  }
  req.user = freshUser;

  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "UNAUTHORIZED",
      });
    }

    next();
  };
};

exports.updatePassword = (req, res) => {
  const user = User.findByIdAndUpdate(req.user.id, req.body.password);
  if (!user) {
    return res.status(404).json({
      message: "cannot update",
    });
  }
  createSendToken(user, 204, res);
};
