const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload')
const { 
    uploadImage,
    getImages,
    getImageById,
    deleteImage
} = require('../controllers/imageController')


router.post('/upload', upload.single('image'), uploadImage)
router.get('/', getImages)
router.get('/:id', getImageById)
router.delete('/:id', deleteImage)


module.exports = router