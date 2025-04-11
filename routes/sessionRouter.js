const express = require('express')
const { sessionsController } = require('../controllers')
const { AuthMiddleware } = require('../middlewares')


const router = express.Router()

router.post("/login", sessionsController.login)
router.delete("/logout", AuthMiddleware, sessionsController.logout)

module.exports = {
    sessionsRouter: router
}
