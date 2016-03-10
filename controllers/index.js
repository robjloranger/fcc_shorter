var express = require('express')
, router = express.Router();

// call in router modules from controllers
router.use('/new', require('./new'));
router.use('/', require('./root'));

//export the router
module.exports = router;
