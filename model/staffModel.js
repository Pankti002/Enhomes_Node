const mongoose = require("mongoose")
const staffSchema = new mongoose.Schema({
    staffMemberName: String,
    type: String,
    entryTime: String,
    exitTime: String,
    contactNo: String,
    address: String,
    agencyName: String,
    agencyContactNumber: String
})

module.exports = mongoose.model('Staff', staffSchema)