const mongoose = require("mongoose")

const fileSchema = mongoose.Schema({
    filePic: {
        type: String,
        required: true
    }
})

const FilePic = mongoose.model("upload", fileSchema)

module.exports = FilePic