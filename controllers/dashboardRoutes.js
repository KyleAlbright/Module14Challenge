const router = require("express").Router();
const sequelize = require("../config/connection");

const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {'userId': req.session.userId}, 
            include: [User]
        });

        const userPosts = postData.map((post) => post.get ({ plain: true}));
        res.render('all-posts', {
            layout: 'dashboard', userPosts
        });
    } catch (err){
        res.redirect('login');
    }
});

module.exports = router