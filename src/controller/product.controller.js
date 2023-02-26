const express = require("express")
const Product = require("../models/product.model")

const router = express.Router()

router.get("/", async (req, res)=> {
    try {
        const page = req.query.page || 1;
        const size = req.query.size || 3;
        const product = await Product.find().skip((page-1)*size).limit(size).lean().exec();
        res.send(product);
    } catch (error) {
        
    }

})

router.post("/search", async (req, res)=> {
    try {
        let name = req.body.name
        // const regex = new RegExp(name, 'i'); //this is used to fetch all the records with character specified by the user
        // const regex = new RegExp(`^${name}`, 'i'); //this is used to fetch record starting with the character specified by the user

        // const product = await Product.find({ price: {$gte: 800} }).lean().exec(); // this will fetcha all the records except MOROCCANOIL

        // const product = await Product.find({ title: {$not: {$eq : "MOROCCANOIL"}} }).lean().exec(); // this will fetcha all the records except MOROCCANOIL

        // const product = await Product.find({ $and : [{title :{$eq : "AVEDA"}} , {price: {$lte : 800 }}] }).lean().exec(); // using multiple conditions

        const product = await Product.find({ title: { $regex: name, $options: 'i' } }).lean().exec(); // using multiple conditions

        res.send(product)

    } catch (error) {
        
    }
})

module.exports = router