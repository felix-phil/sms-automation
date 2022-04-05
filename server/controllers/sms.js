const SMS = require('../model/sms');
const { validationResult } = require('express-validator');
const client = require('twilio')(
  process.env.TWL_SID,
  process.env.TWL_AUTH_TOKEN
);

const { validate } = require('validate-phone-number-node-js');
exports.userMessages = async (req, res, next) => {
  try {
    const userMessageCount = await SMS.find({
      sender: req.user,
    }).countDocuments();
    res.status(200).json({ userMessageCount });
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
};

exports.sendMessage = async (req, res, next) => {
  const { recipients, body } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.status = 400;
      error.data = errors.array();
      throw error;
    }
    const phoneRegex = new RegExp(``);
    for (recipient in recipients) {
      if (!validate(recipients[recipient])) {
        const error = new Error(
          `Invalid phone number ${recipients[recipient]} at index ${recipient}`
        );
        error.status = 400;
        throw error;
      }
    }
    const sms = new SMS({
      sender: req.user,
      body: body,
      status: 'pending',
    });
    let errorTwlResponseNos = [];
    for (const recipient of recipients) {
      const message = await client.messages.create({
        from: process.env.TWL_PHONE || null,
        to: recipient,
        body: body,
        messagingServiceSid: process.env.TWL_MSG_ID,
      });
      if (!message) {
        errorTwlResponseNos.push({
          recipient,
          status: 'failed!',
          msg: 'Something went wrong',
        });
        const error = new Error(`Error sending message to ${recipient}`);
        error.status = 400;
        error.data = errorTwlResponseNos;
        throw error;
      }
      sms.recipients.push(recipient);
    }
    sms.status = 'delievered';
    await sms.save();
    res.status(201).json({ sms, message: 'Messages sent successfuly' });
  } catch (error) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
};
