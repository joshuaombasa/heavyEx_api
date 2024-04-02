const equipmentRouter = require('express').Router()
const Equipment = require('../models/equpment')

// const getToken = async(request, response, next) => {
//     const token = request.h
// }


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
    const equipmentObject = new Equipment({
        name, price, description, type, imageUrl
    })
    try {
        const savedEquipment = await equipmentObject.save()
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