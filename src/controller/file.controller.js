const express = require('express')
const router = express.Router()
const uploadSingle = require("../middleware/uploadFile")
const File = require("../models/file.model")


router.post('/', uploadSingle('file'), async (req, res) => {
    try {
        const file =  await File.create({
            filePic: req.file.path
        })
        res.send({file})
    } catch (error) {
        
    }
  });


  module.exports = router