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

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: { exclude: ['password'] }
                },
                {
                    model: Comment,
                    include: [{
                        model: User,
                        attribues: { exclude: 'password' }
                    }]
                }
            ]
        });

        // const post = postData.map(details => details.get({ plain: true }));
        const post = postData.get({ plain: true });
        res.status(200).json(post);
        // render to homepage

    } catch (e) {
        console.log(e);
        res.status(500);
    }
})

module.exports = router;