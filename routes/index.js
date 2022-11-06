const express = require('express');
const router = express.Router();

const homecontroller = require('../controllers/home_controller');

router.get('/', homecontroller.home);
router.use('/users', require('./users'));

// For any other routes, access from here
// router.use('/routerName', require('./routerFile'));


module.exports = router;