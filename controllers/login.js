const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('json-web-token')
const loginRouter = require('express').Router()
require('dotenv').config()

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body
    const user = await User.findOne({ username })
    if (!user) {
        return response.status(401).json({ error: 'invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)

    if (!isMatch) {
        return response.status(401).json({ error: 'invalid credentials' })
    }

    const userObjectForToken = {
        username: user.username,
        name: user.name,
        id:user._id,
        email: user.name
    }

    const token = await jwt.sign(userObjectForToken, process.env.SECRET, { expiresIn: 60 * 60 })

    response.status(201).json({
        token, username: user.username,
        name: user.name,
        email: user.name
    })
})


module.exports = loginRouter