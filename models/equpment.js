const mongoose = require('mongoose')

const equipemntSchema = new mongoose.Schema({
    name: { type: String, require: true },
    price: { type: Number, require: true },
    description: { type: String, require: true },
    type: { type: String, require: true },
    imageUrl: { type: String, require: true },
})

equipemntSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Equipment', equipemntSchema)