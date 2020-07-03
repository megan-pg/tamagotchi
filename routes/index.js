const router = require('express').Router();
const htmlRoutes = require('./html-routes.js');
const userRoutes = require('./user-routes.js');
const animalRoutes = require('./animal-routes.js');

router.use('/api/users', userRoutes);
router.use('/api/animals', animalRoutes);

router.use('/', htmlRoutes);

module.exports = router;
