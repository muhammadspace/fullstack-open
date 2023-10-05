const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        name: String,
        passwordHash: String,
        notes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Note"
            }
        ]
    }
)

userSchema.plugin(uniqueValidator)

userSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        delete ret.passwordHash
    }
})

module.exports = mongoose.model("User", userSchema)