const router = require('express').Router();
const comments = require('./comments');

router.use('/comments', comments);

module.exports = router;