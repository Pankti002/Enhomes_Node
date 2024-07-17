const eventModel = require("../model/eventModel")
const validator = require("validator")
const { json } = require("express")

module.exports.addEvent = function (req, res) {

    let house = req.body.house
    let place = req.body.place
    let eventDate = req.body.eventDate
    let eventEndDate = req.body.eventEndDate
    let eventDetails = req.body.eventDetails
    let rent = req.body.rent

    let event = new eventModel({
        "house": house,
        "place": place,
        "eventDate": eventDate,
        "eventEndDate": eventEndDate,
        "eventDetails": eventDetails,
        "rent": rent,
    })

    let isError = false;
    let err = [];


    if (eventDetails == undefined || validator.isAlpha(eventDetails) == false || eventDetails.trim().length == 0) {
        isError = true;
        err.push({
            "eventDetails Error": "Please Enter Valid Details"
        })
    }
    if (rent == undefined || validator.isNumeric(rent.toString()) == false || rent.trim().length == 0) {
        isError = true;
        err.push({
            "Rent Error": "Please Enter Valid Rent Amount"
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
        event.save(function (err, data) {
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
                    "msg": "Event Added!!"
                })
            }
        })
    }
}

//getAllevent
module.exports.getAllEvents = function (req, res) {
    eventModel.find().populate("house").populate("place").exec(function (err, data) {
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
                "msg": "Events Retrived!!"
            })
        }
    })
}

//update event
module.exports.updateEvent = function (req, res) {

    let eventId = req.body.eventId
    let eventDate = req.body.eventDate
    let eventEndDate = req.body.eventEndDate
    let eventDetails = req.body.eventDetails
    let rent = req.body.rent

    let isError = false;
    let err = [];

    if (eventDetails != undefined) {
        if (validator.isAlpha(eventDetails) == false || eventDetails.trim().length == 0) {
            isError = true;
            err.push({
                "Event Detail Error": "Please Enter Valid information"
            })
        }
    }

    if (rent != undefined) {
        if (rent == undefined || rent.trim().length == 0) {
            isError = true;
            err.push({
                "Rent error": "Enter Valid Amount"
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

        eventModel.updateOne({ _id: eventId }, { eventDate: eventDate, eventEndDate: eventEndDate, eventDetails: eventDetails, rent: rent }, function (err, data) {
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
                    "msg": "event Updated!!"
                })
            }
        })
    }
}
//deleteevent
module.exports.deleteEvent = function (req, res) {
    let eventId = req.params.eventId
    eventModel.deleteOne({ _id: eventId }, function (err, data) {
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
                "msg": " Deleted!!"
            })
        }
    })
}

// event date api

module.exports.getCheckDate = function (req, res) {
    let startDate = req.params.startDate
    let endDate = req.params.endDate

    // eventModel.find({
    //     $or: [{ eventDate: { $gte: startDate, $lte: endDate } },
    //     { eventEndDate: { $gte: startDate, $lte: endDate } }]
    // }
    //11
    //12
    //--13  
    //15
    //16      
    //12 12 s1 
    //10 15 no 
    //15 22 s2 
    //5  22 s2 


    eventModel.find({
        $and: [{ eventDate: { $lte: startDate } },
        { eventEndDate: { $gte: endDate } }
        ]

    }, function (err, data) {



        if (err) {
            console.log(err)
            res.json({
                "status": -1,
                "data": err,
                "msg": "Something went Wrong...."
            })
        }
        else {
            console.log(data);
            if (data.length == 0) {
                console.log("checkong end date")
                eventModel.find({
                    eventEndDate: { $gte: startDate, $lte: endDate }
                }, function (err, data2) {
                    if (data2.length == 0) {
                        console.log("checking final condition 10 and 15");
                        eventModel.find({
                            eventDate: { $gte: startDate, $lte: endDate }
                        }, function (err, data3) {
                            if (data3.length == 0) {

                                res.json({
                                    "status": 200,
                                    "data": [],
                                    "msg": "NoEvent!!"
                                })
                            } else {

                                res.json({
                                    "status": 200,
                                    "data": data3,
                                    "msg": "Event Retrived!!"
                                })
                            }
                        })
                    } else {

                        res.json({
                            "status": 200,
                            "data": data2,
                            "msg": "Event Retrived!!"
                        })
                    }
                })

            } else {

                res.json({
                    "status": 200,
                    "data": "set1",
                    "msg": "Event Retrived!!"
                })
            }
        }

    })
}


// event end date api

module.exports.getCheckEndDate = function (req, res) {
    let startDate = req.params.startDate
    let endDate = req.params.endDate

    //
    eventModel.find({
        eventDate: { $gte: startDate, $lte: endDate }
    }, function (err, data) {
        if (err) {
            console.log(err)
            res.json({
                "status": -1,
                "data": err,
                "msg": "Something went Wrong...."
            })
        }
        else {
            if (data.length == 0) {
                res.json({
                    "status": 200,
                    "data": data,
                    "msg": "No Event Found!!"
                })
            } else {
                res.json({
                    "status": 200,
                    "data": data,
                    "msg": "Event Retrived!!"
                })
            }
        }
    })
}


