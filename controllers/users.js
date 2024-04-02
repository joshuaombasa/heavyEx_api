const User = require('../models/user')
const usersRouter = require('express').Router()


usersRouter.get('/', async (request, response) => {
    try {
        const users = await User.find({})
        response.json(users)
    } catch (error) {
        next(error)
    }
})

usersRouter.get('/:id', async (request, response) => {
    try {
        const user = await User.findById(request.params.id)
        if (!user) {
            return response.sendStatus(404)
        }
        response.status(200).json(user)
    } catch (error) {
        next(error)
    }
})

usersRouter.post('/', async (request, response) => {
    const { username, name, email, password, isAdmin } = request.body
    const dataObject = new User({ username, name, email, password, isAdmin })

    try {
        const savedUser = await dataObject.save()
        response.status(201).json(savedUser)
    } catch (error) {
        next(error)
    }
})

usersRouter.put('/:id', async (request, response) => {
    const { username, name, email, password, isAdmin } = request.body
    const dataObject = { username, name, email, password, isAdmin }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            request.params.id,
            dataObject,
            { new: true }
        )
        response.status(201).json(updatedUser)
    } catch (error) {
        next(error)
    }
})

usersRouter.delete('/', async (request, response) => {
    try {
        await User.findByIdAndDelete(request.params.id)
        response.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

module.exports = usersRouter