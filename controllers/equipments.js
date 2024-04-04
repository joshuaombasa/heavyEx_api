const equipmentRouter = require('express').Router()
const Equipment = require('../models/equpment')
const jwt = require('json-web-token')
require('dotenv').config()
const User = require('../models/user')

const getToken = async(request, response, next) => {
    const authorization = request.get('authorization')
    if ((authorization && authorization.startsWith('Bearer '))) {
        return authorization.replace('Bearer ','')
    }
    return null
}


equipmentRouter.get('/', async (request, response, next) => {
    try {
        const equipment = await Equipment.find({})
        response.json(equipment)
    } catch (error) {
        next(error)
    }
})

equipmentRouter.get('/:id', async (request, response, next) => {

    try {
        const equipment = await Equipment.findById(request.params.id)
        if (!equipment) {
            return response.sendStatus(404)
        }
        response.json(equipment)
    } catch (error) {
        next(error)
    }
})

equipmentRouter.post('/', async (request, response, next) => {
    const { name, price, description, type, imageUrl } = request.body
    
    const decodedToken = jwt.verify(getToken(request).process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findOne({id:decodedToken.id})
    
    const equipmentObject = new Equipment({
        name, price, description, type, imageUrl
    })
    try {
        const savedEquipment = await equipmentObject.save()

        user.notes = user.notes.concat(savedEquipment._id)
        
        response.status(200).json(savedEquipment)
    } catch (error) {
        next(error)
    }
})

equipmentRouter.put('/:id', async (request, response, next) => {
    const { name, price, description, type, imageUrl } = request.body

    const data = { name, price, description, type, imageUrl }

    try {
        const equipment = await Equipment.findById(request.params.id)
        if (!equipment) {
            return response.sendStatus(404)
        }
        const updatedEquipment = await Equipment.findByIdAndUpdate(request.params.id,
            data,
            { new: true })

        response.status(201).json(updatedEquipment)
    } catch (error) {
        next(error)
    }
})

equipmentRouter.delete('/:id', async (request, response, next) => {
    try {
        await Equipment.findByIdAndDelete(request.params.id)
        response.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

module.exports = equipmentRouter