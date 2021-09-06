const router = require('express').Router();
const { Post, Comment, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: Comment }]
        });
        const posts = postData.map(post => post.get({ plain: true }));

        res.status(200).json(posts);
        // render to homepage

    } catch (e) {
        console.log(e);
        res.status(500);
    }

})

module.exports = router;