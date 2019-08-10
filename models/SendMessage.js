const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema

const SendMessageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String
  },
  rwgister_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = SendMessage = mongoose.model("sendMessage", SendMessageSchema);
