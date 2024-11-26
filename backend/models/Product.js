const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  label: String,
  productName: String,
  varietal: String,
  price: Number,
  availability: String,
  caseSize: { type: Number, default: 6 },
  soldAsCase: { type: Boolean, default: true },
});

module.exports = mongoose.model('Product', ProductSchema);