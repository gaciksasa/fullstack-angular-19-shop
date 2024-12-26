const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  brand: String,
  category: String,
  tags: [String],
  thumbnail: String,
  images: [String],
  availabilityStatus: String
});

module.exports = mongoose.model('Product', productSchema);