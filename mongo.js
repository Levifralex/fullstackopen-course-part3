const mongoose = require('mongoose')

if (process.argv.length === 3) {
  const password = process.argv[2]

  const url = `mongodb+srv://levifralexmdb:${password}@cluster0.kkkmw.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

  mongoose.set('strictQuery', false)

  mongoose.connect(url)

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

  const Person = mongoose.model('Person', personSchema)

  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person)
    })
    mongoose.connection.close()
  })

  return
}

if (process.argv.length < 5) {
  console.log('please give password, person\'s name and number as argument')
  process.exit(1)
}

const password = process.argv[2]

const personName = process.argv[3]
const personNumber = process.argv[4]

const url = `mongodb+srv://levifralexmdb:${password}@cluster0.kkkmw.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: personName,
  number: personNumber,
})

person.save().then(() => {
  console.log(`added ${personName} number ${personNumber} to phonebook`)
  mongoose.connection.close()
})
