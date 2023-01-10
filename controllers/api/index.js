// directs the routes in the API folder
const router = require('express').Router();

const userRoutes = require('./users.js');
const commentRoutes = require('./comments.js');
const postRoutes = require('./posts.js')

router.use("/users", userRoutes);
router.use('/comments', commentRoutes);
router.use('/posts', postRoutes)





module.exports = router;