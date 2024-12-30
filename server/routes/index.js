const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// Fallback route
router.use((req, res) => {
    res.status(404).send('Route not found');
});

module.exports = router;