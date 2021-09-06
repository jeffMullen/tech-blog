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

    } catch (err) {
        console.log(err);
        res.status(500);
    }
})

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: { exclude: 'password' }
                },
                {
                    model: Comment,
                    include: [{
                        model: User,
                        attributes: { exclude: 'password' }
                    }]
                }
            ]
        });

        const post = postData.get({ plain: true });
        res.status(200).json(post);
        // render to homepage

    } catch (err) {
        console.log(err);
        res.status(500);
    }
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

module.exports = router;