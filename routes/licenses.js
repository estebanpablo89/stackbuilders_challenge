const express = require('express');

const { getResult } = require('../controllers/licenses');

const router = express.Router();

router.route('/').post(getResult);

module.exports = router;
