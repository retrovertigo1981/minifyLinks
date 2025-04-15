const express = require("express")
const cookieParser = require("cookie-parser")
const { usersRouter, linkRouter, sessionsRouter } = require("./routes")
const { errorHandler, CheckAuthMiddleware } = require("./middlewares")



const app = express()
const PORT = process.env.PORT || 3000


app.get("/", (req, res) => {
    res.send("Hola Mundo")
})


// Middlewares
app.use(cookieParser())
app.use(express.json());
app.use(CheckAuthMiddleware)

// Routes

// rutas específicas
app.use("/users", usersRouter)
app.use("/links", linkRouter)
app.use("/auth", sessionsRouter)

// ruta raíz
app.use("/", linkRouter)


// Error handling middleware
app.use(errorHandler);



app.listen(PORT, () => {
    console.log(`Server corriendo en puerto: ${PORT}`)
})