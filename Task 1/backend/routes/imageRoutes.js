const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload')
const { 
    uploadImage,
    getImages
} = require('../controllers/imageController')


router.post('/upload', upload.single('image'), uploadImage)
router.get('/', getImages)


module.exports = router