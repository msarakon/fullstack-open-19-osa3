require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const Person = require('./models/person')

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan(':method :url :status :body - :response-time ms'))

app.get('/', (req, res) => res.send('<h1>Hello World!</h1>'))

app.get('/info', (req, res) => {
  Person.find().then(persons => {
    const timestamp = new Date()
    res.send(`Puhelinluettelossa on ${persons.length} henkilön tiedot<br />${timestamp}`)
  })
})

app.get('/api', (req, res) => res.send('<h1>API</h1>'))
  
app.get('/api/persons', (req, res) =>
  Person.find().then(persons => res.json(persons))
)

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) res.json(person)
      else res.status(404).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (!body) {
    res.status(400).json({ error: 'content missing' })
  } else if (!body.name) {
    res.status(400).json({ error: 'name must be given' })
  } else if (!body.number) {
    res.status(400).json({ error: 'number must be given' })
  } else {
    Person.find({ name: body.name }).then(persons => {
      if (persons.length > 0) res.status(400).json({ error: 'name must be unique' })
      else {
        const person = new Person({ name: body.name, number: body.number })
        person.save().then(savedPerson => res.json(savedPerson))
      }
    })
  }
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  if (!body) {
    res.status(400).json({ error: 'content missing' })
  } else if (!body.name) {
    res.status(400).json({ error: 'name must be given' })
  } else if (!body.number) {
    res.status(400).json({ error: 'number must be given' })
  } else {
    const person = { name: body.name, number: body.number }
    Person.findByIdAndUpdate(req.params.id, person, { new: true })
      .then(updatedPerson => res.json(updatedPerson))
      .catch(error => next(error))
  }
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => res.status(204).end())
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return res.status(400).send({ error: 'malformed id' })
  }
  next(error)
}

app.use(errorHandler)

const port = process.env.PORT || 3001

app.listen(port, () => console.log(`Server running on port ${port}`))