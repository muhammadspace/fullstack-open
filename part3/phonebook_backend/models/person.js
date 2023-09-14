const mongoose = require('mongoose')

console.log(`Connecting to ${process.env.MONGODB_URI}`)
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI)
    .then( result => console.log('Connected to MongoDB') )
    .catch( err => console.error("Couldn't connect to MongoDB", err) )

const personSchema = mongoose.Schema(
    {
        name: {
            type: String,
            minLength: 3,
            required: true,
        },
        number: {
            type: String,
            validate: {
                validator: (num) => /\d{3}-\d{5,}/.test(num) || /\d{2}-\d{6,}/.test(num),
                message: props => `${props.value} is not a valid phone number!`
            },
            required: [true, "User phone number required"]
        }
    }
)
personSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})

module.exports = mongoose.model('Person', personSchema)