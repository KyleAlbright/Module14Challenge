const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [User],
    });

    const userComments = commentData.map((comment) =>
      comment.get({ plain: true })
    );

    res.json(userComments);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  const commentBody = req.body;
  console.log(req.body)
  try {
    const newComment = await Comment.create({
      ...commentBody,
      user_id: req.session.userId,
    });
    res.json(newComment);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

module.exports = router;
