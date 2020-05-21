const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Future task: User registration
//const { isEmail } = require('validator')

// https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
/* const EmailSchema = new mongoose.Schema({
  email: {
    //... other setup
    validate: [isEmail, 'invalid email'],
  },
}) */

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, minlength: 1, required: true },
  name: { type: String, minlength: 1, required: true },
  passwordHash: { type: String, minlength: 8, required: true },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
