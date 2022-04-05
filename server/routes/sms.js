const express = require('express')
const smsControllers = require("../controllers/sms")
const { body } = require("express-validator")
const router = express.Router()
const isAuth = require("../middleware/isAuth")

router.get("/messages", isAuth, smsControllers.userMessages)
router.post("/send", isAuth, 
[
    body("recipients").notEmpty().withMessage("Recipients are required").isArray({min: 1, max: 10}),
    body("body").notEmpty().withMessage("Message body is required!").isString()
], smsControllers.sendMessage)

module.exports = router