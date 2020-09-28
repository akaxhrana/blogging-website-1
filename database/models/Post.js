const { constants } = require('buffer');
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

  title: String,
  content: String,
  username: String,
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;