const {verifyToken} = require("../utils")

const CheckAuthMiddleware = (req, res, next) => {
    try {
        const isAuthenticated = verifyToken(req);
        if (!isAuthenticated) {
            req.user = null; // Aseguramos que req.user sea null si no hay autenticación
        }
        console.log('Estado de autenticación:', !!req.user);
        console.log('Usuario en req.user:', req.user);
        next();
    } catch (error) {
        console.log('Error en CheckAuthMiddleware:', error);
        req.user = null;
        next();
    }
};

// Mantenemos el middleware original para rutas protegidas
const AuthMiddleware = (req, res, next) => {
    const signature = verifyToken(req)

    try {
        if (signature) {
            return next()
        } else {
            throw new Error("Token Inválido", { cause: 'INVALID_CREDENTIALS' });
        }
    } catch (error) {
        next(error)
    }
}

// const AdminMiddleware = (req, res, next) => {
//     try {
//         if (req?.usuario?.tipoUsuario == 'admin') {
//             return next()
//         } else {
//             throw new Error("Token Inválido", { cause: 'INVALID_CREDENTIALS' });
//         }
//     } catch (err) {
//         next(err)
//     }
// }

module.exports = {
    CheckAuthMiddleware,
    AuthMiddleware,
    // AdminMiddleware,
}