const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  college: String,
  printOption: String,
  urgency: String,
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Ready', 'Completed'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
