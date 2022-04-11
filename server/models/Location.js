const mongoose = require('mongoose');

const { Schema } = mongoose;

const locationSchema = new Schema({
  city: {
    type: String,
    required: false,
    trim: true
  },
  stateLocation: {
    type: String,
    required: false,
    trim: true
  },
  country: {
    type: String,
    required: false,
    trim: true
  }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;