const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.body.user_id
        });

        res.status(200).json(postData);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        await postData.destroy();
        res.status(200).json({ message: 'Post has been deleted!' });
    } catch (err) {
        console.log(err);
        res.status(500);
    }
})

module.exports = router;