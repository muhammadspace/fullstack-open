const mongoose = require('mongoose')


if (process.argv.length > 2)
{
    const password = process.argv[2]
    const uri = `mongodb+srv://fullstack:${password}@fso.khnzyyx.mongodb.net/phonebook?retryWrites=true&w=majority`
    mongoose.set('strictQuery', false)
    mongoose.connect(uri)

    const personSchema = mongoose.Schema(
        {
            name: String,
            number: String
        }
    )

    const Person = mongoose.model('Person', personSchema)

    if (process.argv.length === 3)
    {
        // print people in phonebook
        Person.find({}).then( result => {
            console.log('phonebook:')
            result.forEach( person => {
                console.log(`${person.name} ${person.number}`)
                mongoose.connection.close()
            })
        })
    }
    else if (process.argv.length === 5)
    {
        // add new person to phonebook
        const person = new Person(
            {
                name: process.argv[3],
                number: process.argv[4]
            }
        )

        person.save().then( result => {
            console.log(`added ${person.name} number ${person.number} to phonebook`)
            mongoose.connection.close()
        })
    }
}
else
{
    console.log('use either <password> <name> <number> to add a new person or <password> to get the list of people')
    process.exit(1)
}