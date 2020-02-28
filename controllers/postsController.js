exports.index = (req, res) => {
  res.json({
    posts: [
      { 
        title: 'Post 1', 
        descripiton: 'this post is private.' 
      },
      { 
        title: 'Post 2', 
        descripiton: 'this post is also private.' 
      },
    ]
  })  
};
