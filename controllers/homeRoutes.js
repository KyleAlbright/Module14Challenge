const router = require("express").Router();
const { Post, User, Comment } = require("../models");


router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User,
        attributes: ['username'], }],

    });
    const posts = postData.map((post) => post.get({ plain: true }));
    
    res.render("homepage", {
      
     posts, loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err)
    
  }
  // res.render("dashboard")
});
  
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
  } else {
    res.render("login", {});
  }
});

module.exports = router;
