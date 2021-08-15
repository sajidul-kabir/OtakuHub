const mongoose = require("mongoose");
const slugify = require("slugify");

const communitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
    },
    members: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    slug: String,
    description: {
      type: String,
      trim: true,
    },
    imageCover: String,
    images: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

communitySchema.pre("save", function (next) {
  this.slug = slugify(this.name);
  next();
});

//virtual populate
communitySchema.virtual("posts", {
  ref: "Post",
  foreignField: "_community",
  localField: "_id",
});

const Community = mongoose.model("Community", communitySchema);
module.exports = Community;
