const Order = require('../models/Order');
const sendEmail = require('../utils/sendEmail');

exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    order.status = req.body.status;
    await order.save();

    // 🔔 Send email when status is "Completed"
    if (order.status === 'Completed') {
      await sendEmail(order.email, order.name, order._id);
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
