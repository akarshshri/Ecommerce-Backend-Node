const express = require('express')
const cors = require('cors')
const app = express()
const connect = require("./src/config/db")
const UserController = require("./src/controller/user.controller")
const ProductController = require("./src/controller/product.controller")
const verifyToken = require("./src/middleware/auth")


app.use(cors())

app.use(express.json())

app.use("/user", verifyToken, UserController)

app.use("/product", verifyToken ,ProductController)

app.listen(3001, async ()=> { 
    try {
        console.log("Listening on 3001")
        await connect()
    } catch (error) {
        console.log(error)
    }
})