const Post = require('../model/Post');
const validations = require('../validations/postValidations');

exports.index = async (_req, res) => {
  const posts = await Post.find({}, (_err, data) => res.json(data) );

  res.json(posts);
};

exports.show = async (req, res) => {
  const post = await Post.findOne({_id: req.params.id});

  res.json(post);
};

exports.create = async (req, res) => {
  const { error } = validations(req.body);

  if (error) {
    return res.status(400).send(error)
  }

  const post = new Post({
    title: req.body.title,
    description: req.body.description
  })

  try {
    const savedPost = await post.save();
    res.send({ post: savedPost._id });
  } catch(err) {
    res.status(400).send(err)
  }

  res.json()  
};