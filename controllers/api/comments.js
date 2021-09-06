const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            content: req.body.content,
            user_id: req.body.user_id,
            post_id: req.body.post_id
        });

        res.status(200).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
})

module.exports = router;