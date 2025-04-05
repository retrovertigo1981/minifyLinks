const { ValidationError, UniqueConstraintError } = require('sequelize')

const errorHandler = async (err, req, res, next) => {
    console.error(err)

    if (err instanceof UniqueConstraintError) {
        const { errors } = err
        if (errors.length > 0) {
            /**
             * Caso sistemas Unix
             */
            errors.forEach(error => {
                delete error.instance
                delete error.validatorKey
                delete error.origin
                delete error.type
                delete error.validatorName
                delete error.validatorArgs
                delete error.path
            })

            return res.status(409).json(errors)
        }

        /**
         * Caso servidor Windows
         */
        const message = err.parent?.detail

        return res.status(409).json({ message })
    }

    if (err instanceof ValidationError) {
        const { errors } = err

        const errorMessages = errors.map(({ path, message }) => ({ [path]: message }))

        return res.status(400).json(errorMessages)
    }

    if (err?.cause == 'INVALID_CREDENTIALS') {
        return res.status(401).redirect('/login')
    }

    return res.status(500).json({ message: 'Internal Server Error' })
}

module.exports = { errorHandler }
