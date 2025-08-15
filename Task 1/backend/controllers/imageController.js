const Image = require('../models/Image')

const uploadImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
        
        const { originalname, buffer, size } = req.file
        const { name } = req.body

        if (!name) return res.status(400).json({ error: 'Image name is required' })
        
        const newImage = await Image.create({
            name,
            filename: originalname,
            fileData: buffer,
            fileSize: size
        })

        res.json({ id: newImage._id, name: newImage.name, filename: newImage.filename })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getImages = async (req, res) => {
    const images = await Image.find().select('-fileData')
    res.json(images)
}

const getImageById = async (req, res) => {
    try {

    } catch (error) {

    }
}

const deleteImage = async (req, res) => {
    try {

    } catch (error) {

    }
}


module.exports = {
    uploadImage,
    getImages
}