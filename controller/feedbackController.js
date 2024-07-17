const feedbackModel = require("../model/feedbackModel")
const validator = require("validator")

module.exports.addfeedback = function (req, res) {

    let house = req.body.house
    let date = req.body.date
    let feedback = req.body.feedback
    let acknowledgement = req.body.acknowledgement

    console.log(req.body)

    let feedbackName = new feedbackModel({

        "house": house,
        "date": date,
        "feedback": feedback,
        "acknowledgement": acknowledgement
    })

    let isError = false;
    let err = [];

    if (feedback == undefined || feedback.trim().length == 0) {
        isError = true;
        err.push({
            "feedback Error": "Please Enter Valid feedback"
        })
    }
    if (acknowledgement == undefined || acknowledgement.trim().length == 0) {
        isError = true;
        err.push({
            "acknowledgement Error": "Please Enter Valid acknowledgement"
        })
    }


    if (isError) {
        console.log(err)
        res.json({
            "status": -1,
            "data": err,
            "msg": "Something went Wrong...."
        })
    }
    else {
        feedbackName.save(function (err, data) {
            if (err) {
                console.log(err)
                res.json({
                    "status": -1,
                    "data": err,
                    "msg": "Something went Wrong...."
                })
            }
            else {
                res.json({
                    "status": 200,
                    "data": data,
                    "msg": "feedback Added!!"
                })
            }
        })
    }
}

//get all feedback
module.exports.getAllfeedback = function (req, res) {
    feedbackModel.find().populate("house").exec(function (err, data) {
        if (err) {
            console.log(err)
            res.json({
                "status": -1,
                "data": err,
                "msg": "Something went Wrong...."
            })
        }
        else {
            res.json({
                "status": 200,
                "data": data,
                "msg": "feedback Retrived!!"
            })
        }
    })
}


//update feedback
module.exports.updatefeedback = function (req, res) {

    let date = req.body.date
    let feedback = req.body.feedback
    let acknowledgement = req.body.acknowledgement


    let isError = false;
    let err = [];


    if (feedback != undefined) {
        if (validator.isAlpha(feedback) == false || feedback.trim().length == 0) {
            isError = true;
            err.push({
                "feedback Error": "Please Enter Valid feedback"
            })
        }
    }

    if (acknowledgement != undefined) {
        if (validator.isAlpha(acknowledgement) == false || acknowledgement.trim().length == 0) {
            isError = true;
            err.push({
                "acknowledgement Error": "Please Enter Valid acknowledgement"
            })
        }
    }


    if (isError) {
        console.log(err)
        res.json({
            "status": -1,
            "data": err,
            "msg": "Something went Wrong...."
        })
    }
    else {
        feedbackModel.updateOne({ _id: feedbackId }, { date: date, feedback: feedback, acknowledgement: acknowledgement }, function (err, data) {
            if (err) {
                console.log(err)
                res.json({
                    "status": -1,
                    "data": err,
                    "msg": "Something went Wrong...."
                })
            }
            else {
                res.json({
                    "status": 200,
                    "data": data,
                    "msg": "feedback Updated!!"
                })
            }
        })
    }
}

//delete feedback
module.exports.deletefeedback = function (req, res) {
    let feedbackId = req.params.feedbackId
    feedbackModel.deleteOne({ _id: feedbackId }, function (err, data) {
        if (err) {
            console.log(err)
            res.json({
                "status": -1,
                "data": err,
                "msg": "Somethong went Wrong...."
            })
        }
        else {
            res.json({
                "status": 200,
                "data": data,
                "msg": "feedback Deleted!!"
            })
        }
    })
}