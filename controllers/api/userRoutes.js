const router = require('express').Router();
const { User } = require('../../models');

// Create a new user
router.post('/', async (req, res) => {
    try {
        const newUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(newUserData);
        })
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

module.exports = router;