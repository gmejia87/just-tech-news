//import User model
const User = require("./User");
//import Post model
const Post = require("./Post");

// create associations
User.hasMany(Post, {
  foreignKey: "user_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

//export models
module.exports = { User, Post };
