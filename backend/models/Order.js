const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  pricePerCase: Number,
});

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  customerName: String,
  email: String,
  cellphone: String,
  orderDate: { type: Date, default: Date.now },
  totalAmount: Number,
  bankAccountNumber: String,
  orderStatus: { type: String, default: 'Pending' },
  orderItems: [OrderItemSchema],
});

module.exports = mongoose.model('Order', OrderSchema);