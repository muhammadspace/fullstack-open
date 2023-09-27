const blogRouter = require("express").Router()
const Blog = require("../models/blog.js")
const logger = require("../utils/logger.js")

blogRouter.get("/", async (req, res, next) => {
    try
    {
        const blogs = await Blog.find({})
        res.status(200).json(blogs)
    }
    catch(error)
    {
        next(error)
    } 
})

blogRouter.post("/", async (req, res, next) => {
    const blog = new Blog(req.body)
    if (!blog.likes)
        blog.likes = 0
    if (!blog.url || !blog.title)
        res.status(400).end()
    
    try
    {
        const savedBlog = await blog.save()
        logger.info(`Added ${savedBlog.title} by ${savedBlog.author}`)
        res.status(201).json(savedBlog)
    }
    catch(error)
    {
        next(error)
    }
})

blogRouter.delete("/:id", async (req, res, next) => {
    const id = req.params.id

    try 
    {
        const deletedBlog = await Blog.findByIdAndDelete(id)
        res.status(204).json(deletedBlog)
        console.log(`Deleted blog`)
    } 
    catch (error) {
        next(error)    
    }
})

blogRouter.put("/:id", async (req, res, next) => {
    const id = req.params.id
    
    try
    {
        const updated = await Blog.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updated)
        console.log(`Updated blog "${updated.title}"`)
    }
    catch (error)
    {
        next(error)
    }
})

module.exports = blogRouter