const nonMemberModel = require("../model/NonMemberModel")
const validator = require("validator")
//add nonMember

module.exports.addNonMember = function (req, res) {
    let house = req.body.house
    let name = req.body.name
    let arrivingTime = req.body.arrivingTime
    let isVisited = req.body.isVisited
    let pickup = req.body.pickup
    let status = req.body.status


    let nonMember = new nonMemberModel({
        "house": house,
        "name": name,
        "arrivingTime": arrivingTime,
        "isVisited": isVisited,
        "pickup": pickup,
        "status": status

    })

    let isError = false;
    let err = [];

    if (name == undefined || validator.isAlpha(name) == false || name.trim().length == 0) {
        isError = true;
        err.push({
            "name Error": "Please Enter Valid Name"
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
        nonMember.save(function (err, data) {
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
                    "msg": "nonMember Added!!"
                })
            }
        })
    }
}

//getAllNonMember
module.exports.getAllNonMember = function (req, res) {
    nonMemberModel.find().populate("house").exec(function (err, data) {
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
                "msg": "NonMember Retrived!!"
            })
        }
    })
}



//update nonmemebr
module.exports.updateNonMember = function (req, res) {
    let nonMemberId = req.body.nonMemberId
    let name = req.body.name
    let arrivingTime = req.body.arrivingTime
    let isVisited = req.body.isVisited
    let pickup = req.body.pickup
    let status = req.body.status

    let isError = false;
    let err = [];


    if (name != undefined) {
        if (validator.isAlpha(name) == false || name.trim().length == 0) {
            isError = true;
            err.push({
                "name Error": "Please Enter Valid Name"
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
        nonMemberModel.updateOne({ _id: nonMemberId }, { "name": name, "arrivingTime": arrivingTime, "isVisited": isVisited, "pickup": pickup, "status": status }, function (err, data) {
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
                    "msg": "NonMember Updated!!"
                })
            }
        })
    }
}



//delete nonMember
module.exports.deleteNonMember = function (req, res) {
    let nonMemberId = req.params.nonMemberId
    nonMemberModel.deleteOne({ _id: nonMemberId }, function (err, data) {
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
                "msg": "nonMember Deleted!!"
            })
        }
    })
}