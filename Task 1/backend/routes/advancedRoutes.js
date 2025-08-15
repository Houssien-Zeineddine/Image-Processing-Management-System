const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload')
const { uploadAdvancedImage } = require('../controllers/advancedController')

router.post('/upload', upload.single('image'), uploadAdvancedImage)

module.exports = router
