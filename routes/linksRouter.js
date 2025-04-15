const express = require('express');
const router = express.Router();
const { linkController } = require('../controllers');

router.post('/shorten', linkController.createLink);
router.get('/user/:userId', linkController.getLinksByUserId); // Cambiado a una ruta específica para usuarios
router.get('/:shortCode', linkController.redirectLink);

module.exports = {
    linkRouter: router
}