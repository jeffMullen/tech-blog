const router = require('express').Router();
const { Post } = require('../../models');

// Create a new post
router.post('/posts', async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.userId
        });

        res.status(200).json(postData);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
})

// Update a post
router.put('/dashboard/posts/:id', async (req, res) => {
    try {
        const postData = await Post.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        res.status(200).json(postData);
    } catch {
        console.log(err);
        res.status(500);
    }
})

// Delete a post
router.delete('/dashboard/posts/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        console.log(postData);

        await postData.destroy();
        res.status(200).json({ message: 'Post has been deleted!' });
    } catch (err) {
        console.log(err);
        res.status(500);
    }
})

module.exports = router;