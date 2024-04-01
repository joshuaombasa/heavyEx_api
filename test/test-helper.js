const Equipment = require('../models/equpment')


const constructionEquipment = [
    {
        name: "Excavator",
        price: 100000,
        description: "A heavy construction equipment used to dig trenches and foundations.",
        type: "Heavy Machinery",
        imageUrl: "https://example.com/excavator.jpg"
    },
    {
        name: "Bulldozer",
        price: 150000,
        description: "A powerful tracked vehicle equipped with a large metal plate (blade) used to push large quantities of soil, sand, rubble, etc., during construction.",
        type: "Heavy Machinery",
        imageUrl: "https://example.com/bulldozer.jpg"
    },
    {
        name: "Crane",
        price: 200000,
        description: "A tall machine used for lifting heavy objects. It's commonly used in the construction of tall buildings.",
        type: "Lifting Equipment",
        imageUrl: "https://example.com/crane.jpg"
    },
    {
        name: "Concrete Mixer",
        price: 50000,
        description: "A device that mixes cement, aggregate, and water to form concrete mechanically.",
        type: "Mixing Equipment",
        imageUrl: "https://example.com/concrete-mixer.jpg"
    },]

const equipmentInDb = async () => {
    const response = await Equipment.find({})
    return response
}


const getnonExistentId = async () => {
    const equipmentObject = new Equipment({
        name: "Backhoe Loader",
        price: 120000,
        description: "A versatile piece of heavy equipment that can be used as an excavator and as a loader. It has a digging bucket on one end and a loader bucket on the other end.",
        type: "Heavy Machinery",
        imageUrl: "https://example.com/concrete-mixer.jpg"
    })

    const savedEquipement = await equipmentObject.save()
    await Equipment.findByIdAndDelete(savedEquipement._id)
    return savedEquipement._id.toString()
}

const newEquipment = {
    name: "Concrete Mixer",
    price: 50000,
    description: "A device that mixes cement, aggregate, and water to form concrete mechanically.",
    type: "Mixing Equipment",
    imageUrl: "https://example.com/concrete-mixer.jpg"
}

const InvalidEqupment = {
    name: "Invalid Equpment",
    imageUrl: "https://example.com/concrete-mixer.jpg"
}

const updateData = {
    name: "Concrete Mixer",
    price: 50000,
    description: "A device that mixes cement, aggregate, and water to form concrete mechanically.",
    type: "Mixing Equipment",
    imageUrl: "https://example.com/concrete-mixer.jpg"
}
module.exports = {
    constructionEquipment,
    equipmentInDb,
    getnonExistentId,
    newEquipment,
    InvalidEqupment,
    updateData
}