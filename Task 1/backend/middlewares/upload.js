const multer = require('multer')

//Set up multer storage and save directly to MongoDB
const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Only JPG, PNG, GIF files are allowed'))
    }

    cb(null, true)
}


module.exports = multer({
    storage,
    limits: { fileSize: 10* 1024 * 1024},
    fileFilter
})
