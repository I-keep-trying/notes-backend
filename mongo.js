require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

/* const note = new Note({
  content: "Another note for testing",
  date: new Date(),
  important: false,
});

note.save().then((response) => {
  console.log("note saved!");
  mongoose.connection.close();
}); */

const x = Note.find({ content: /note/i }).then((result) => {
  result.forEach((note) => {
    console.log('List of notes from db')
    console.log(note)
  })
  mongoose.connection.close()
})

console.log('x', x)
