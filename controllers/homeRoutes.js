const router = require("express").Router();
const { Post, User, Comment } = require("../models");


router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User,
        attributes: ['username'], }, {model: Comment, 
          include: [{model: User, attributes:['username']}],
        attributes: ['comment_body', "date_created"]}],


    });
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts[0].comments)
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
