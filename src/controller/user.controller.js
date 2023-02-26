const express = require("express")
const User = require("../models/user.model")
const { body, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const verifyToken = require("../middleware/auth")

const router = express.Router()

const newToken = (user) => {
    return jwt.sign(user,"something");
  }


router.post("/register", body("email").isEmail().withMessage("Enter valid email") , async (req, res) =>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()[0].msg})
        }
        const user =  await User.findOne({email: req.body.email})
        if(user){
            return res.send("User already Exists")
        }else{
            const newUser = await User.create(req.body)
            const token = newToken({id: newUser._id})
            // Use a projection to exclude the password field from the returned user object
            const userWithoutPassword = await User.findById(newUser._id).select('-password')
            return res.send({
                msg: "Created successfully",
                user: userWithoutPassword,
                token: token
            })
        }

    } catch (error) {
        
    }
})

router.post("/login", async (req,res)=>{
    try {

        const emailFound =  await User.findOne({email: req.body.email})
        if(emailFound){
            const passwordCheck = emailFound.checkPassword(req.body.password)
            if(passwordCheck){
                const token = newToken(emailFound)
                res.send({msg: "Login successful!", token: token})
            }else{
                res.send({msg: "Password incorrect"})
            }
        }else{
            res.send({msg: "Account not found"})
        }


    } catch (error) {
        
    }
})

router.delete("/delete", async (req, res) => {
    try {

        if(!req.headers.token){
            res.send({status:"key not provided or valid"})
        }
    
        if(!req.headers.token.startsWith("Bearer ")){
            res.send({status:"key not provided or valid"})
        }

        const id = verifyToken(token)

        const result = await User.findByIdAndDelete(id)
        res.send(result)
        
        
    } catch (error) {

        
    }
})

router.patch("/update", async (req, res) => {
    try {
        const name = req.body.name
        const id = verifyToken(req.headers.token)
        const details = await User.findByIdAndUpdate(id, {name: name}, { new : true})
        res.send(details)
    } catch (error) {
        
    }
})

module.exports = router 