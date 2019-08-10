const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema

const UserSchema = new Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone_no: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  rwgister_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("user", UserSchema);
