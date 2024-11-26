const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const nodemailer = require('nodemailer');

// POST /api/orders
router.post('/', async (req, res) => {
  const {
    customerName,
    email,
    cellphone,
    orderItems,
    totalAmount,
  } = req.body;

  const newOrder = new Order({
    customerName,
    email,
    cellphone,
    totalAmount,
    bankAccountNumber: '123-456789-00',
    orderItems,
  });

  try {
    const savedOrder = await newOrder.save();

    // Email order confirmation
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to shop
    const shopMailOptions = {
      from: 'wine11228@gmail.com',
      to: 'wine11228@gmail.com',
      subject: `New Order Received - ${savedOrder._id}`,
      text: `
        New Order Details:
        -------------------
        Customer Name: ${customerName}
        Email: ${email}
        Cellphone: ${cellphone}
        Total Amount: $${totalAmount.toFixed(2)}

        Order Items:
        ${orderItems
          .map(
            (item) =>
              `${item.quantity} x ${item.productName} @ $${item.pricePerCase} per case`
          )
          .join('\n')}

        Please process this order.
      `,
    };

    // Email to customer
    const customerMailOptions = {
      from: 'wine11228@gmail.com',
      to: email,
      subject: `Order Confirmation - ${savedOrder._id}`,
      text: `
        Kia ora ${customerName},

        Thank you for your order! Here are the details:
        -------------------
        Total Amount: $${totalAmount.toFixed(2)}
        Bank Account: 123-456789-00
        Reference: ${savedOrder._id}

        Order Items:
        ${orderItems
          .map(
            (item) =>
              `${item.quantity} x ${item.productName} @ $${item.pricePerCase} per case`
          )
          .join('\n')}

        Please make the payment and include the reference number for processing.

        Ngā mihi,
        Wine Shop
      `,
    };

    // Send emails
    await transporter.sendMail(shopMailOptions);
    await transporter.sendMail(customerMailOptions);

    res.json(savedOrder);
  } catch (error) {
    console.error('Error placing order or sending email:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;