const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/checkLogin');

router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            content: req.body.content,
            user_id: req.session.userId,
            post_id: req.body.post_id
        });

        res.status(201).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
})

module.exports = router;