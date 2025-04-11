const { sign, verify } = require("jsonwebtoken");
const { envConfig } = require("../config");

const generateToken = (payload) => {
    return sign(payload, envConfig.JWT_SECRET, { expiresIn: "1d" });
}

const verifyToken = (req) => {
    const tokenSignatured = req.cookies;
    console.log('Cookies recibidas:', tokenSignatured);
    if (tokenSignatured.Bearer) {
        try {
            const payload = verify(tokenSignatured.Bearer, envConfig.JWT_SECRET, { algorithms: ["HS256"] });
            console.log('Payload decodificado:', payload);
            req.user = payload;
            return true;
        } catch (error) {
            console.log('Error al verificar el token:', error.message);
            return false;
        }
    } else {
        console.log('No se encontró el token en las cookies');
        return false;
    }
};

module.exports = {
    generateToken,
    verifyToken
}
