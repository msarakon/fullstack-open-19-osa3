const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan(':method :url :status :body - :response-time ms'))

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Martti Tienari",
    "number": "040-123456",
    "id": 2
  },
  {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 3
  },
  { 
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 4
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
  const count = persons.length
  const timestamp = new Date()
  res.send(`Puhelinluettelossa on ${count} henkilön tiedot<br />${timestamp}`)
})

app.get('/api', (req, res) => {
  res.send('<h1>API</h1>')
})
  
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) res.json(person)
  else res.status(404).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (!body) {
    res.status(400).json({ error: 'content missing' })
  } else if (!body.name) {
    res.status(400).json({ error: 'name must be given' })
  } else if (persons.find(person => person.name === body.name)) {
    res.status(400).json({ error: 'name must be unique' })
  } else if (!body.number) {
    res.status(400).json({ error: 'number must be given' })
  } else {
    const newPerson = {
      id: Math.floor(Math.random() * 9999) + 5,
      name: body.name,
      number: body.number
    }
    persons = persons.concat(newPerson)
    res.json(newPerson)
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server running on port ${port}`))