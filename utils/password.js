const { verify } = require("argon2")

const validatePassword = async (storedPassword, providedPassword) => {
    return await verify(storedPassword, providedPassword)
}


module.exports = {
    validatePassword
}