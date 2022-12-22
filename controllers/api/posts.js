const router = require("express").Router();
const { Post, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get ("/:id", async (req, res) => {
 
  try {
    const userPosts = await Post.findByPk(req.params.id, {
      include: [{ model: User, 
      attributes: ['username'], }]
    });

    if(userPosts) {
      const posts = userPosts.get ({ plain: true});

      res.render("post", {posts, loggedIn: req.session.loggedIn})
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post("/", withAuth, async (req, res) => {
  const postBody = req.body;
  try {
    const newPost = await Post.create({
      ...postBody,
      user_id: req.session.userId,
    });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const [postsToEdit] = await Post.update(req.body, {
      where: { id: req.params.id },
    });

    if (postsToEdit > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
    try {
      const [postsToDelete] = Post.destroy({
        where: { id: req.params.id },
      });
  
      if (postsToDelete > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;