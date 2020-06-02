const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { name: 1 })
  response.json(notes.map((note) => note))
})

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

notesRouter.delete('/:id', async (request, response) => {
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

notesRouter.post('/', async (request, response) => {
  const body = request.body
  console.log('note request.body', body)
  const token = getTokenFrom(request)
  console.log('token', token)

/*
part 4-9 ... fails with no token
const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  } */

  if (!token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
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

notesRouter.put('/:id', async (request, response) => {
  const body = request.body
  //// validate user

  const note = {
    content: body.content,
    important: body.important,
  }
  await Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
  })

  response.send(note)
})

module.exports = notesRouter
