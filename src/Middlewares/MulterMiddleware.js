const multer = require('multer')
const path = require('path')

// diskStorage gives full access for storing files on disk
const storageConfig = multer.diskStorage({    
    destination: (req, file,next)=>{
        // error first callback
        // first parameter is null
        next(null, 'uploads/')
    },
    filename:(req, file,next)=>{
        console.log(file)
        next(null,`${Date.now()}${path.extname(file.originalname)}`)
    }
})

const uploader = multer({ storage: storageConfig })
module.exports = uploader