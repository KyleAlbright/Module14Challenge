const router = require("express").Router();
const sequelize = require("../config/connection");

const { Post, User } = require("../models");
const withAuth = require("../utils/auth.js");

//get all posts and show the user who posted
router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.userId },
      include: [User],
    });
    // serialization to remove excess data that wont be displayed
    const userPosts = postData.map((post) => post.get({ plain: true }));
    console.log(userPosts)
    res.render("dashboard", {
      // layout: "dashboard",
     posts:  userPosts, loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err)
    res.redirect("login");
  }
  // res.render("dashboard")
});
// create new post route
router.get("/create", withAuth, (req, res) => {
  res.render("create-posts", {
    layout: "main",
  });
});
// route to edit the post

router.get("/edit/id:", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    // serialization to remove excess data that wont be displayed
    if (postData) {
      const userPosts = postData.get({ plain: true });

      res.render("edit-posts", {
        layout: "dashboard",
        userPosts,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect("login");
  }
});

module.exports = router;
