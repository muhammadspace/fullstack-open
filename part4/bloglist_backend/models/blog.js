const mongoose = require("mongoose")

const blogSchema = mongoose.Schema(
    {
        title: String,
        author: String,
        url: String,
        likes: Number
    }
)

blogSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = doc._id.toString()
        delete ret._id
        delete ret.__v
    }
})

module.exports = mongoose.model("blog", blogSchema)