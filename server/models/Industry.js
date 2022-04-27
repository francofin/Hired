const mongoose = require('mongoose');

const { Schema } = mongoose;

const industrySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }, 
  gicsCode: {
    type:Number,
    required:false,
  }
});

const Industry = mongoose.model('Industry', industrySchema);

module.exports = Industry;
