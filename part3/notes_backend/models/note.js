const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const uri = process.env.MONGODB_URI

console.log('Connecting to', uri)

mongoose.connect(uri)
    .then( res => console.log('Connected to MongoDB') )
    .catch( error => console.log('Error connecting to MongoDB: ', error) )
    
const noteSchema = mongoose.Schema(
    {
        content: String,
        important: Boolean
    }
) 

noteSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }}
)

module.exports = mongoose.model('Note', noteSchema)