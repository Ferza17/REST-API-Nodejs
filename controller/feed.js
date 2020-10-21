/**
 * ========= Packages ==============
 */
/**
 * ========= End Packages ==============
 */
exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        title: "First posts",
        content: "This is my first posts!",
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  // Create post in db
  res.stauts(201).json({
    message: "Post Created!",
  });
};
