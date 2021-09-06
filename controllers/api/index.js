const router = require('express').Router();
const comments = require('./comments');
const posts = require('./posts');

router.use('/comments', comments);
router.use('/posts', posts);

module.exports = router;