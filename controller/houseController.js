const houseModel = require("../model/houseModel")
const validator = require("validator")
//addHouse

module.exports.addHouse = function (req, res) {
    let user = req.body.user
    let houseDetails = req.body.houseDetails;

    let house = new houseModel({
        "user": user,
        "houseDetails": houseDetails
    })


    let isError = false;
    let err = [];

    if (houseDetails == undefined || houseDetails.trim().length == 0) {
        isError = true;
        err.push({
            "HouseDetails Error": "Please Enter Valid Information"
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
        house.save(function (err, data) {
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
                    "msg": "House Added!!"
                })
            }
        })
    }
}

//getAllHouses
module.exports.getAllHouses = function (req, res) {
    houseModel.find(function (err, data) {
        houseModel.find().populate("user").exec(function (err, data) {
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
                    "msg": "Houses Retrived!!"
                })
            }
        })
    })
}



//update House
module.exports.updateHouse = function (req, res) {
    let houseId = req.body.houseId
    let houseDetails = req.body.houseDetails

    isError = false;
    let err = [];

    if (houseDetails != undefined) {
        if (houseDetails.trim().length == 0) {
            isError = true;
            err.push({
                "HouseDetails Error": "Please Enter Valid Information"
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
        houseModel.updateOne({ _id: houseId }, { houseDetails: houseDetails }, function (err, data) {
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
                    "msg": "House Updated!!"
                })
            }
        })
    }
}



//deleteHouse
module.exports.deletehouse = function (req, res) {
    let houseId = req.params.houseId
    houseModel.deleteOne({ _id: houseId }, function (err, data) {
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
                "msg": "House Deleted!!"
            })
        }
    })
}