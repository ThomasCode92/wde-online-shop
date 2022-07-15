const multer = require('multer');

const { storage } = require('../config/cloudinary');

const upload = multer({ storage });

const uploadImage = upload.single('image');

module.exports = uploadImage;
