const db = require('../models')
const { validatePassword, generateToken } = require('../utils')
const { User } = db

const sessionsController = {}

sessionsController.login = async (req, res, next) => {
    /**
     * email: provisto por el usuario
     * password: provisto por el usuario (sin encriptar)
     */

    const { email, password } = req.body

    try {
        const user = await User.findOne({ where: { email } })

        if (!user) throw new Error('Usuario o contraseña inválidos', { cause: 'INVALID_CREDENTIALS' });

        /**
         * Comparamos contraseña que entrega usuario
         * por formulario  vs contraseña almacenada (encriptada)
         */
        const isValid = await validatePassword(user.password, password)

        if (!isValid) throw new Error('Usuario o contraseña inválidos', { cause: 'INVALID_CREDENTIALS' });

        /**
         * Creamos la firma o JWT (JOSE)
         */
        const signature = generateToken({
            _id: user.id,
            email: user.email,
            // tipo_usuario: usuario.tipo_usuario,

        })


        return res.cookie('Bearer', signature).json({ message: 'Usuario loggeado' })
    } catch (error) {
        next(error)
    }
}

sessionsController.logout = async (req, res, next) => {

    if (req.user) {
        return res.clearCookie('Bearer').json({ message: 'Sesión cerrada' })
    }

    return res.json({ message: 'No haz iniciado sesión' })
}

module.exports = {
    sessionsController
}