var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    index: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  },
  updated: {
    type: Date, default: Date.now
  },
  isPlayer: {
    type: Boolean,
    default: true
  },
  age: {
    type: Number, min: 18, max: 150
  }
});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
UserSchema.methods.speak = function () {
  var greeting = this.name ? "User name is " + this.name : "I don't have a name";
  console.log(greeting);
};

var User = mongoose.model('User', UserSchema);

module.exports = {
  User: User
};