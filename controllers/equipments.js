const equipmentRouter = require('express').Router()
const Equipment = require('../models/equpment')


equipmentRouter.get('/', async (request, response, next) => {
    console.log('request iko')
    const newEquipment = new Equipment({
        name: "Concrete Mixer",
        price: 50000,
        description: "A device that mixes cement, aggregate, and water to form concrete mechanically.",
        type: "Mixing Equipment",
        imageUrl: "https://example.com/concrete-mixer.jpg"
    })
    try {
        await newEquipment.save()
       
        const equipment = await Equipment.find({})
        response.status(200).json(equipment)
    } catch (error) {
        next(error)
    }
})

module.exports = equipmentRouter