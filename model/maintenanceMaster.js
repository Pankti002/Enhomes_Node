const mongoose = require("mongoose")

const maintenanceMasterSchema = new mongoose.Schema({
    maintenanceAmount: String,
    penalty: String,
})

module.exports = mongoose.model("MaintenanceMaster", maintenanceMasterSchema)