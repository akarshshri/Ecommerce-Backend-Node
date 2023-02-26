const mongoose =  require("mongoose")

mongoose.set("strictQuery", false)

const connect = () => {
    return mongoose.connect("mongodb+srv://akarsh:akarsh@ecom.7ufk0ae.mongodb.net/?retryWrites=true&w=majority")
}


module.exports = connect