const express = require('express');
const router = express.Router();
const controller = require('.././controllers');
const controllerService = require('.././controllersService');
const auth = require('../frankify/controllers/auth')

module.exports = router;
/////////////// Routes  /////////////////////////////

router.get('/', controller.main.index)
router.post('/authenticate', auth.auth)
router.post('/create', controller.create.create)

 
router.post('/traxcom', controllerService.traxcom.send); 
