const express = require("express")
const {createPost, getAllNews} = require("../controllers/news");
const router = express.Router()


router.get("/", getAllNews)
router.post("/", createPost)

module.exports = router