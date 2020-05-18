require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
});

const kittySchema = new mongoose.Schema({
  name: String,
});

kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
};

const Kitten = mongoose.model("Kitten", kittySchema);

var foofoo = new Kitten({ name: "foofoo" });
foofoo.speak();

const silence = new Kitten({ name: "Silence" });
console.log(silence.name);

foofoo.save(function (err, fluffy) {
  if (err) return console.error(err);
  foofoo.speak();
});

Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
});

Kitten.find({ name: /^fluff/ });
