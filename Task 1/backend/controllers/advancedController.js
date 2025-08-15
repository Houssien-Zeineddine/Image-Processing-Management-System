const Image = require('../models/Image')
const Job = require('../models/job')

const uploadAdvancedImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({error: 'No file uploaded'})
        
        const { originalname, buffer, size } = req.file
        const { name, userEmail } = req.body

        if (!name) return res.status(400).json({ error: 'Image name is required' })

        const newImage = await Image.create({
            name,
            filename: originalname,
            fileData: buffer,
            fileSize: size
        })

        const newJob = await Job.create({
            originalImageId: newImage,
            status: 'pending',
            targetDimensions: [], // No resizing, only enhancement
            userEmail
        })

        await advancedQueue.add('enhance-image', { jobId: newJob._id })

        res.json({ message: 'Advanced processing started', jobId: newJob._id, imageId: newImage._id })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}