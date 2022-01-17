const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const server = express()
const authRouter = require("./routers/auth")
const newsRouter = require("./routers/news")

mongoose.connect(process.env.MONGO_LINK)
    .then(() => console.log("DB IS CONNECTED"))
    .catch(() => console.log("DB IS NOT CONNECTED"))

server.use(cors())
server.use(express.json())
server.use("/api/v1", authRouter)
server.use("/api/v1/news", newsRouter)

server.listen(process.env.PORT || 8080, () => {
    console.log("Server is started")
})