require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Note = require('./models/note')
const User = require('./models/user')

const cors = require('cors')

const expiresIn = '1h'

app.use(cors())

app.use(bodyParser.json())

app.use(express.static('build'))

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

/* ------------------------------------------ */
/* NOTES ROUTES - to be refactored later */
/* ------------------------------------------ */
app.get('/api/notes', async (request, response) => {
  const notes = await Note.find({}).populate('user', { name: 1 })
  response.json(notes.map((note) => note))
})

/* app.get('/api/notes', (request, response) => {
  Note.find({ content: /html/i }).then((notes) => {
    response.json(notes.map((note) => note.toJSON()))
  })
}) */

app.get('/api/notes/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const userId = user._id.toString()

  const note = await Note.findById(request.params.id)
  const noteUser = note.user.toString()
  if (userId === noteUser) {
    note.deleteOne(note)
    response.send(`Note sucessfully deleted`)
  } else if (userId !== noteUser) {
    return response
      .status(400)
      .send(
        `Unauthorized user, ${user.name} : Cannot delete another users note`
      )
  }
  return
})

app.post('/api/notes', async (request, response) => {
  const body = request.body

  /*   
This doesn't work - id not found before login for some reason
const userId = await User.findById(body.userId)
  console.log('user findById', userId, typeof userId) */

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user,
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.json(savedNote.toJSON())
})

app.patch('/api/notes/:id', async (request, response) => {
  const body = request.body
  //// validate user
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const userId = user._id.toString()
  /////
  const note = await Note.findByIdAndUpdate(request.params.id, body, {
    new: true,
  })
  const noteUser = note.user.toString()
  if (userId !== noteUser) {
    response.send(
      `Unauthorized user, ${user.name} : Cannot change another users note`
    )
    return
  }
  response.send(note)
})

/* ------------------------------------------ */
/* USERS ROUTES - to be refactored later */
/* ------------------------------------------ */

app.get('/api/users', async (request, response) => {
  const users = await User.find({}).populate('notes', { content: 1, date: 1 })
  response.json(users.map((user) => user))
})

app.post('/api/users', async (req, res) => {
  const user = new User(req.body)
  try {
    const token = await user.newAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

/* app.post('/api/users', async (request, response) => {
  const body = request.body
if (body.password.length < 8) {
  return response.json('password too short')
}
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })
  const savedUser = await user.save()

  response.json(savedUser)
}) */

/* ----------------------------------------- */
/* LOGIN ROUTE - to be refactored later */
/* ------------------------------------------ */

app.post('/api/login', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn })

  response.status(200).send({ token, username: user.username, name: user.name })
})

/* ERROR HANDLING - for all routes */

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
