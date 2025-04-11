// Sequelize
require('dotenv').config()

const { env } = process

const envConfig = {
    "development": {
        "username": env.DB_USER,
        "password": env.DB_PASSWORD,
        "database": env.DB_DATABASE,
        "host": env.DB_HOST,
        "dialect": "postgres",
    },
    JWT_SECRET: env.JWT_SECRET,
    BASE_URL: env.BASE_URL
}

module.exports = envConfig