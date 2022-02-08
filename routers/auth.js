const express = require("express")
const router = express.Router()
const {signin, signup, isAuthenticate, getUserInfo} = require("../controllers/auth")

router.get("/user/:id", getUserInfo)
router.post("/signup", signup)
router.post("/signin", signin)
router.post("/authentication", isAuthenticate)
module.exports = router