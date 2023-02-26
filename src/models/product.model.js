const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    "img1": {
        type: String,
        required: true,
        unique: false
    },
    "img2":{
        type: String,
        required: true,
        unique: false
    },
    "title": {
        type: String,
        required: true,
        unique: false
    },
    "price": {
        type: Number,
        required: true,
        unique: false
    },
    "des1": {
        type: String,
        required: true,
        unique: false
    },
    "des2": {
        type: String,
        required: true,
        unique: false
    },
})

const Product = mongoose.model("product", productSchema)

module.exports = Product