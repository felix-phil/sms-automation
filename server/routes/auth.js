const express = require('express')
const authControllers = require("../controllers/auth")
const User = require('../model/user')
const { body } = require("express-validator")
const router = express.Router()

router.post("/register", [
    body("email", "Enter valid email").notEmpty().withMessage("Email field can't be empty")
        .isEmail().withMessage("Valid email required")
        .custom(async (value) => {
            try {
                const user = await User.findOne({ email: value })
                if (user) {
                    return Promise.reject("User with this email already exists")
                }
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        })
        .normalizeEmail(),
    body("password", "Enter valid password").notEmpty().withMessage("Passworld field field can't be empty").
        isAlphanumeric().withMessage("Password should contain letters and numbers only")
        .trim()
], authControllers.register)

router.post("/login", [body("email", "Enter valid email").notEmpty().withMessage("Email field can't be empty")
    .isEmail().withMessage("Valid email required")
    .normalizeEmail(),
body("password", "Enter valid password").notEmpty().withMessage("Passworld field field can't be empty").trim()
], authControllers.login)

module.exports = router