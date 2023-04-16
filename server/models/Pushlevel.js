const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LevelSchema = new Schema({
  level: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Pushlevel = mongoose.model("level", LevelSchema);