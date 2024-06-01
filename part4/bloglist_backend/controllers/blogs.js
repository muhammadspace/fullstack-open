const blogRouter = require("express").Router()
const Blog = require("../models/blog.js")
const User = require("../models/user.js")
const jwt = require("jsonwebtoken")
const logger = require("../utils/logger.js")

blogRouter.get("/", async (req, res, next) => {
    try
    {
        const blogs = await Blog.find({}).populate("user")
        res.status(200).json(blogs)
    }
    catch(error)
    {
        next(error)
    } 
})

blogRouter.post("/", async (req, res, next) => {
    const decodedToken = jwt.decode(req.token, process.env.SECRET)

    if( !decodedToken )
        return res.status(401).json({ error: "Invalid token" })

    const user = await User.findById(decodedToken.id)
    const blog = new Blog({ ...req.body, user: user._id })
    delete blog.token
    
    if (!blog.likes)
        blog.likes = 0
    if (!blog.url || !blog.title)
        res.status(400).end()
    
    try
    {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await User.findByIdAndUpdate(user._id, user)
        logger.info(`Added ${savedBlog.title} by ${savedBlog.author}`)
        res.status(201).json(savedBlog)
    }
    catch(error)
    {
        next(error)
    }
})

blogRouter.delete("/:id", async (req, res, next) => {
    const blogId = req.params.id

    try 
    {
        const blog = await Blog.findById(blogId)
        if (!blog)
            return res.status(404).json({ error: "There's no blog with this ID. No blog was deleted." })

        if (blog.user.toString() !== req.user._id.toString())
            return res.status(401).json({ error: "Only the user who created the blog can delete it" })


        const deletedBlog = await Blog.deleteOne({ _id: blogId })
        req.user.blogs = req.user.blogs.map( b => b.id !== deletedBlog._id )
        res.status(204).json(deletedBlog)
        console.log("Deleted blog")
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

blogRouter.post("/:id/comment", async (req, res, next) => {
    try {
        const comment = req.body.comment
        const id = req.params.id

        const blog = await Blog.findById(id)

        if (!blog.comments)
        {
            blog.comments = [comment]
        }
        else
        {
            blog.comments = blog.comments.concat(comment)
        }

        await blog.save()
        res.status(201).json({ success: true, message: "successfully commented" })
    } catch (error) {
        next(error)
    }
})

module.exports = blogRouter