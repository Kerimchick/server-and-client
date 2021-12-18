const express = require("express")
const router = express.Router()
const {signin, signup, isAuthenticate} = require("../controllers/auth")

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/authentication", isAuthenticate)
module.exports = router