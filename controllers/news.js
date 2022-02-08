const News = require("../models/news")
const User = require("../models/user")

const getAllNews = async (req, res) => {
    try {
        const news = await News.find({}).populate("userId")
        res.json(news)
    } catch (e) {
        res.status(400).json({message: "Get error"})
    }
}

const createPost = async (req, res) => {
    try {
        const newPost = new News(req.body)
        const savedPost = await newPost.save()
        await User.findByIdAndUpdate(savedPost.userId, {$push: {news: savedPost._id}})
        res.json(savedPost)
    } catch (e) {
        res.status(400).json({message: "Save error"})
    }
}

module.exports = {createPost, getAllNews}