const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String,
    required: [true, "Email needed"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Email does not exist"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "A password is needed"],
    minlength: [5, "A password must have atleast 5 characters"],
  },
},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  // hashing password middleware
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (candidatePass, userPass) {
  //Instance method on User model for comparing password
  return await bcrypt.compare(candidatePass, userPass);
};

//virtual populate
userSchema.virtual("posts", {
  ref: "Post",
  foreignField: "_user",
  localField: "_id",
});


const User = mongoose.model("User", userSchema);
module.exports = User;
