const blogRouter = require("express").Router()
const Blog = require("../models/blog.js")
const logger = require("../utils/logger.js")

blogRouter.get("/", (req, res, next) => {
    Blog.find({})
        .then( blogs => {
            res.status(200).json(blogs)
        })
        .catch( error => next(error) )
})

blogRouter.post("/", (req, res, next) => {
    const blog = new Blog(req.body) 
    blog.save()
        .then( blog => {
            logger.info(`Added ${blog.title} by ${blog.author}`)
            res.status(201).json(blog)
        })
        .catch( error => next(error) )
})

module.exports = blogRouter