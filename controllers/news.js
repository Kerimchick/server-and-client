const News = require("../models/news")

const getAllNews = async (req, res) => {
    const news = await News.find({})
    res.json(news)
}

const createPost = async (req, res) => {
    const newPost = new News(req.body)
    const savedPost = await newPost.save()
    res.json(savedPost)
}

module.exports = {createPost, getAllNews}