const router = require('express').Router();
const { Post, Comment, User } = require('../models');

router.get('/:id', async (req, res) => {
    try {
        // Change req.params.id to req.session.user_id once we have cookie and login setup
        const userData = await User.findByPk(req.params.id, {
            include: { model: Post },
            attributes: {
                exclude: 'password'
            }
        })

        const user = userData.get({ plain: true });
        res.status(200).json(user);
        // render to dashboard page

    } catch (err) {
        console.log(err);
        res.status(500);
    }
})

module.exports = router;