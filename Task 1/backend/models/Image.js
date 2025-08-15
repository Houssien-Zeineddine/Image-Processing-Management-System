const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    filename: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
    fileSize: { type: Number, required: true },
    fileData: { type: Buffer, required: true }
})

const Image = mongoose.model('Image', imageSchema)

module.exports = Image