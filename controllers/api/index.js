const router = require('express').Router();
const commentRoutes = require('./commentRoutes');
const postRoutes = require('./postRoutes');

router.use('/comments', commentRoutes);
router.use('/posts', postRoutes);

module.exports = router;