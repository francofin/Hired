const mongoose = require('mongoose');

const { Schema } = mongoose;

const industrySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Industry = mongoose.model('Industry', industrySchema);

module.exports = Industry;
