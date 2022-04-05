const User = require("../model/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")

exports.register = async (req, res, next) => {
    const { email, password, fullname } = req.body
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const err = new Error("Validation Failed!")
            err.status = 400
            err.data = errors.array()
            throw err
        }
        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({
            email: email,
            password: hashedPassword,
            fullname: fullname
        })
        await user.save()
        res.status(201).json({ message: "User Created!", user: user })
    } catch (error) {
        if (!error.status) {
            error.status = 500
        }
        next(error)
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const err = new Error("Validation Failed!")
            err.status = 400
            err.data = errors.array()
            throw err
        }
        const user = await User.findOne({ email: email })
        if (!user) {
            const err = new Error("User not found!")
            err.status = 404
            throw err
        }
        const verify = await bcrypt.compare(password, user.password)
        if (!verify) {
            const err = new Error("Invalid email or password")
            err.status = 400
            throw err
        }
        const token = jwt.sign({_id: user.id, email:user.email, fullname:jwt.fullname }, process.env.JWT_SEC, {expiresIn: "12h"})
        res.status(200).json({user: {_id: user.id, email:user.email, fullname:user.fullname }, token:token, message: "Login successful!"})
    } catch (error) {
        if (!error.status) {
            error.status = 500
        }
        // console.log(error)
        next(error)
    }
}