const mongoose =  require("mongoose")
var bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
}, {
    timestamps : true
})


userSchema.pre('save', function(next){
    if(this.isModified("password")){
        const hashPassword = bcrypt.hashSync(this.password, 8)
        this.password = hashPassword
    }
    console.log(this.password)
    next()
} )

userSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

const User = mongoose.model("user", userSchema)

module.exports = User

// db > collections > records