const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema

const MakeAppointSchema = new Schema({
  address: {
    type: String,
    required: true
  },
  dataAndTime: {
    type: String,
    required: true
  },
  constraints: {
    type: String
  },
  work: {
    type: String
  },
  rwgister_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = MakeAppoint = mongoose.model("makeAppoint", MakeAppointSchema);
