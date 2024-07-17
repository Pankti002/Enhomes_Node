const mongoose = require("mongoose")

const houseSchema = new mongoose.Schema({
    houseDetails: String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

})

module.exports = mongoose.model("House", houseSchema)