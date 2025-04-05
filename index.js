const express = require("express")
const { usersRouter } = require("./routes")
const { errorHandler } = require("./middlewares")


const app = express()
const PORT = process.env.PORT || 3000


app.get("/", (req, res) => {
    res.send("Hola Mundo")
})


// Middlewares
app.use(express.json());

// Routes

app.use("/users", usersRouter)

// Error handling middleware
app.use(errorHandler);



app.listen(PORT, () => {
    console.log(`Server corriendo en puerto: ${PORT}`)
})