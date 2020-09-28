const Post = require('../database/models/Post');
const User = require('../database/models/User');
module.exports = async (req, res) => {
  const currUser = await User.findById(req.session.userId);
  const post = await Post.findById(req.params.id);
  res.render("post", {post, currUser});
};