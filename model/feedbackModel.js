const mongoose = require("mongoose")

const FeedbackSchema = new mongoose.Schema({
    date: String,
    feedback: String,
    acknowledgement: String,
    house: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "House"
    }
})

module.exports = mongoose.model("Feedback", FeedbackSchema)