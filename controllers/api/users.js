const router = require("express").Router();
const { User } = require("../../models");

router.post("/", (req, res) => {
  User.create({ username: req.body.username, password: req.body.password })
    .then((data) => {
        req.session.save(()=> {
            req.session.User = data.id  
            req.session.loggedIn = true
            req.session.username = data.username
            res.json(data)
        })
    }) .catch((err) =>{
        res.status(500).json(err)
    })
});

module.exports = router;
