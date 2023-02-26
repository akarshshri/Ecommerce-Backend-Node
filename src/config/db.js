const mongoose =  require("mongoose")
const URI = "mongodb+srv://akarsh:akarsh@ecom.7ufk0ae.mongodb.net/?retryWrites=true&w=majority"

mongoose.set("strictQuery", false)

const connect = () => {
    return mongoose.connect(URI)
}


module.exports = connect