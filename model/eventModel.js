const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    eventDate: Date,
    eventEndDate: Date,
    eventDetails: String,
    rent: String,

    house: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "House"
    },
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place"
    }

})
module.exports = mongoose.model("event", eventSchema)