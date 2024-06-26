const mongoose = require('mongoose')

const equipemntSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    imageUrl: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId,ref:'User' }
})

equipemntSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Equipment', equipemntSchema)