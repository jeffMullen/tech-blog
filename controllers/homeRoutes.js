const router = require('express').Router();
const { Post, Comment, User } = require('../models');

// Get all posts on homepage load
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: Comment }, {
                model: User,
                attributes: {
                    exclude: ['password', 'email', 'id']
                }
            }]
        });
        const posts = postData.map(post => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
            userId: req.session.userId
        })

    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

// Look at one post
router.get('/posts/:id', async (req, res) => {
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

        if (!postData) {
            res.status(400).json({ message: 'No post with that id' })
            return;
        }

        const post = postData.get({ plain: true });
        console.log(post);
        // res.status(200).json(post);
        res.render('viewPost', {
            post,
            loggedIn: req.session.loggedIn,
            userId: req.session.userId
        })

    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

// Dashboard route
router.get('/dashboard/:id', async (req, res) => {
    try {
        // Make user can only see their own dashboard
        if (req.session.userId !== parseInt(req.params.id)) {
            res.redirect('/login');
            return;
        }

        const userData = await User.findByPk(req.params.id, {
            include: {
                model: Post,
                include: { model: User }
            },
            attributes: {
                exclude: 'password'
            }
        })

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            user,
            loggedIn: req.session.loggedIn,
            userId: req.session.userId
        })

    } catch (err) {
        console.log(err);
        res.status(500);
    }
})

// Look at one dashboard post
router.get('/dashboard/posts/:id', async (req, res) => {
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

        if (!postData) {
            res.status(400).json({ message: 'No post with that id' })
            return;
        }

        const post = postData.get({ plain: true });
        // res.status(200).json(post);
        res.render('dashboardPost', {
            post,
            loggedIn: req.session.loggedIn,
            userId: req.session.userId
        })

    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

// New post page
router.get('/new-post', (req, res) => {
    try {
        res.render('createPost', {
            loggedIn: req.session.loggedIn,
            userId: req.session.userId
        })
    } catch (err) {
        console.log(err);
        res.status(500);
    }
})

module.exports = router;

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;