const express = require("express");
const { userController } = require("../controllers");

const router = express.Router();

router.get("/", userController.getAllUsers)
router.post("/", userController.createUser)


module.exports = {
    usersRouter: router
}