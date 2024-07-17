const mongoose = require("mongoose")

const maintenanceSchema = new mongoose.Schema({
    creationDate: String,
    month: String,
    maintenanceAmount: String,
    paymentDate: String,
    lastDate: String,
    penalty: String,
    house: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "House"
    }
})

module.exports = mongoose.model("Maintenance", maintenanceSchema)