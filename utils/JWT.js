const { sign, verify } = require("jsonwebtoken");
const { envConfig } = require("../config");

const generateToken = (payload) => {
    return sign(payload, envConfig.JWT_SECRET, { expiresIn: "1d" });
}

const verifyToken = (req) => {
    const tokenSignatured = req.cookies;

    if (tokenSignatured.Bearer) {
        try {
            const payload = verify(tokenSignatured.Bearer, envConfig.JWT_SECRET, { algorithms: ["HS256"] });

            req.user = payload;
            return true;
        } catch (error) {

            return false;
        }
    } else {

        return false;
    }
};

module.exports = {
    generateToken,
    verifyToken
}
