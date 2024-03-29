const equipmentRouter = require('express').Router()
const Equipment = require('../models/equpment')


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

// equipmentRouter.get('/', async (request, response, next) => {
//     try {
//         const equipment = await Equipment.find({})
//         response.status(200).json(equipment)
//     } catch (error) {
//         next(error)
//     }
// })

module.exports = equipmentRouter