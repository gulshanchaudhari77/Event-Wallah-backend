const { types } = require("joi");
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventname: {
    type: String,
    required: true,
  },
  textarea: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  user: [
    {
      type : mongoose.Schema.ObjectId,
      ref: "regform",
    },
  ],

  eventcreater:
  {
    type : mongoose.Schema.ObjectId,
    ref: "users",

  },

});

module.exports = mongoose.model("event", eventSchema);
