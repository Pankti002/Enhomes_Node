const mongoose = require("mongoose")

const memberSchema = new mongoose.Schema({
    memberName: String,
    dateOfBirth: String,
    age: String,
    gender: String,
    contactNo: String,
    house: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "House"
    }

})
module.exports = mongoose.model("member", memberSchema)