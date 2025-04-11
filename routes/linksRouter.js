const express = require('express');
const router = express.Router();
const { linkController } = require('../controllers');

router.post('/shorten', linkController.createLink);
router.get('/:shortCode', linkController.redirectLink);

module.exports = {
    linkRouter: router
}