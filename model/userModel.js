const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: String,
    age: String,
    gender: String,
    contactNo: String,
    email: String,
    password: String,
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    },
    otp:Number

})
module.exports = mongoose.model("User", userSchema)