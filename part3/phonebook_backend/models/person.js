const mongoose = require('mongoose')

console.log(`Connecting to ${process.env.MONGODB_URI}`)
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI)
    .then( result => console.log('Connected to MongoDB') )
    .catch( err => console.error("Couldn't connect to MongoDB", err) )

const personSchema = mongoose.Schema(
    {
        name: String,
        number: String
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