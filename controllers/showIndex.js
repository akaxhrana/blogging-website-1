const User = require('../database/models/User');
const Post = require('../database/models/Post');

module.exports = async (req, res) => {
  const posts = await Post.find({}).sort('-postedAt');
  const currUser = await User.findById(req.session.userId); 
  const allUsers = await User.find({});

  res.render("index", {posts, currUser, allUsers});
};