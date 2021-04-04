const Community = require("../models/communityModel");
const slug=require('slugify')
exports.getAllCommunities = async (req, res) => {
  const communities = await Community.find();

  res.status(200).json({
    message: "successful",
    number_of_communities: communities.length,
    data: {
      communities,
    },
  });
};

exports.CreateNewCommunity = async (req, res) => {
  const newCommunity = await Community.create(req.body);

  res.status(201).json({
    message: "successful",
    data: {
      newCommunity,
    },
  });
};

exports.getACommunity = async (req, res) => {
  var param=slug(req.params.slug);
  param=param.toLowerCase()
  const community = await Community.findOne({ slug:param }).populate(
    {
      path: "posts",
      select: "title text -_community",
    }
  );

  res.status(200).json({
    message: "successful",
    data: {
      community,
    },
  });
};

exports.deleteAllCommunities = async (req, res) => {
  await Community.deleteMany();

  res.status(200).json({
    message: "successfully deleted",
  });
};
