const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  priceUser: {
    type: Number,
    min: 25.99
  },
  priceEmployer: {
    type: Number,
    min: 50.99
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;