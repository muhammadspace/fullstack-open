const mongoose = require('mongoose')

if (process.argv.length < 3)
{
    console.log('give password as arguement')
    process.exit(1)
}

const password = process.argv[2]

const uri = `mongodb+srv://fullstack:${password}@fso.khnzyyx.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(uri)

const noteSchema = mongoose.Schema(
    {
        content: String,
        important: Boolean
    }
)

const Note = mongoose.model('Note', noteSchema)

Note.find({}).then( result => {
    result.forEach( note => console.log(note) )
    mongoose.connection.close()
})

// const note = new Note(
//     {
//         content: "I'm not sure if I should be learning Mongoose without knowing Mongo first, but that's what they're teaching me...",
//         important: false 
//     }
// )

// note.save().then( result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })