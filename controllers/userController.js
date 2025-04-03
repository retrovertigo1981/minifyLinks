const { where } = require("sequelize")
const db = require("../models")
const { User } = db

const userController = {}

// crear usuarios

userController.createuser = async (req, res, next) => {
    const data = req.body
    try {
        const user = await User.create(data)
        return res.status(201).json(user)
    } catch (error) {
        next(error)
    }
}

// obtener todos los usuarios

userController.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll()
        return res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

// obtener un usuario por id

userController.getUserById = async (req, res, next) => {
    const { id } = req.params
    try {
        const user = await User.findByPk(id)
        return res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

// actualizar un usuario por id

userController.updateUser = async (req, res, next) => {
    const { } = req.params
    const data = req.body
    try {
        const user = await User.update(data, { where: { id }, individualHooks: true })
        return res.status(200).json(user)
    } catch (error) {
        next(error)

    }
}

userController.deleteUser = async (req, res, next) => {
    const { id } = req.params
    try {
        const user = await User.destroy({ where: { id } })
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        }
        return res.status(200).json({ message: "Usuario Eliminado" })
    } catch (error) {
        next(error)

    }
}
