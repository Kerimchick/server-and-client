const Users = require("../models/user")
const jwt = require("jsonwebtoken")
const {token} = require("morgan");

const signup = (req, res) => {
    const {name, email, password} = req.body
    Users.findOne({email}).exec((error, user) => {
    if(user){
        return res.status(400).json({message : "That name already exists"})
    }
    const newUser = new Users(req.body)
        newUser.save((error, user) => {
            if(error){
                return res.status(400).json({message: "Error save"})
            }
            return res.json({message : "User successfully added"})
        })
    })
}

const signin = (req, res) => {
    const {email, password} = req.body
    Users.findOne({email}).exec(async (error, user) => {
        if(!user){
            return res.status(400).json({message : "Such user does not exist"})
        }
        if(!await user.authenticate(password)){
            return res.status(401).json({message : "Invalid password"})
        }
        const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY, {expiresIn: "2d"})
        res.json({
            token,
            user : {_id: user._id, email: user.email, role: user.role, name : user.name}
        })
    })
}

const isAuthenticate = async (req, res) => {
    const token = req.body.token
    try {
        if(!token){
            res.status(401).json({message: "Token empty"})
        }
        const payload = jwt.verify(token, process.env.SECRET_KEY )
        const user = await Users.findOne({_id: payload._id})
        res.json({token, user : {_id: user._id, email: user.email, role: user.role, name : user.name}})
    } catch (e) {
        res.status(401).json({message: "Invalid token"})
    }
}

const getUserInfo = async (req, res) => {
    try{
        const user = await Users.findById(req.params.id).populate("news", "-password")
        res.json(user)
    } catch (e) {
        res.status(400).json({message: "Invalid user"})
    }
}
module.exports = {signup, signin, isAuthenticate, getUserInfo}