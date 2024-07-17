const MaintenanceModel = require("../model/maintenanceModel")
const validator = require("validator")

//add Maintenance
module.exports.addMaintenance = function (req, res) {
    let house = req.body.house
    let creationDate = req.body.creationDate
    let month = req.body.month
    let maintenanceAmount = req.body.maintenanceAmount
    let paymentDate = req.body.paymentDate
    let lastDate = req.body.lastDate
    let penalty = req.body.penalty

    let isError = false;
    let err = [];

    let maintenance = new MaintenanceModel({
        "house": house,
        "creationDate": creationDate,
        "month": month,
        "maintenanceAmount": maintenanceAmount,
        "paymentDate": paymentDate,
        "lastDate": lastDate,
        "penalty": penalty
    })

    if (maintenanceAmount == undefined || validator.isNumeric(maintenanceAmount) == false) {
        isError = true;
        err.push({
            "MaintenanceAmount Error": "Enter Valid Amount"
        })
    }
    if (penalty == undefined || validator.isNumeric(penalty) == false) {
        isError = true;
        err.push({
            "Penalty Error": "Enter Valid Amount"
        })
    }

    if (isError) {
        res.json({
            "status": -1,
            "data": err,
            "msg": "Something went Wrong..."
        })
    }
    else {
        maintenance.save(function (err, data) {
            if (err) {
                res.json({
                    "status": -1,
                    "data": err,
                    "msg": "Something went Wrong.."
                })
            }
            else {
                res.json({
                    "status": 200,
                    "data": data,
                    "msg": "Maintenance Entry Added!!"
                })
            }
        })
    }

}



//update Maintenance
module.exports.updateMaintenance = function (req, res) {
    let maintenanceId = req.body.maintenanceId
    let creationDate = req.body.creationDate
    let month = req.body.month
    let maintenanceAmount = req.body.maintenanceAmount
    let paymentDate = req.body.paymentDate
    let lastDate = req.body.lastDate
    let penalty = req.body.penalty

    let isError = false;
    let err = [];

    if (maintenanceAmount != undefined) {
        if (validator.isNumeric(maintenanceAmount) == false) {
            isError = true;
            err.push({
                "MaintenanceAmount Error": "Enter Valid Amount"
            })
        }
    }

    if (penalty != undefined) {
        if (validator.isNumeric(penalty) == false) {
            isError = true;
            err.push({
                "Penalty Error": "Enter Valid Amount"
            })
        }
    }



    if (isError) {
        console.log(err)
        res.json({
            "status": -1,
            "data": err,
            "msg": "Something went Wrong..."
        })
    }
    else {
        MaintenanceModel.updateOne({ _id: maintenanceId }, {
            creationDate: creationDate, month: month, maintenanceAmount: maintenanceAmount, paymentDate: paymentDate,
            lastDate: lastDate, penalty: penalty
        }, function (err, data) {
            if (err) {
                console.log(err)
                res.json({
                    "status": -1,
                    "data": err,
                    "msg": "Something went Wrong..."
                })
            }
            else {
                res.json({
                    "status": 200,
                    "data": data,
                    "msg": "Maintenance Entry Updated!!"
                })
            }
        })
    }

}



//Delete Maintenance
module.exports.deleteMaintenance = function (req, res) {
    let maintenanceId = req.params.maintenanceId
    console.log(maintenanceId)
    MaintenanceModel.deleteOne({ _id: maintenanceId }, function (err, data) {
        if (err) {
            console.log(err)
            res.json({
                "status": -1,
                "data": err,
                "msg": "Something went Wrong..."
            })
        }
        else {
            res.json({
                "status": 200,
                "data": data,
                "msg": "Maintenance Entry Deleted!!"
            })
        }
    })
}


//List Maintenance
module.exports.getAllMaintenance = function (req, res) {
    MaintenanceModel.find().populate("house").exec(function (err, data) {
        if (err) {
            console.log(err)
            res.json({
                "status": -1,
                "data": err,
                "msg": "Something went Wrong..."
            })
        }
        else {
            res.json({
                "status": 200,
                "data": data,
                "msg": "Maintenance Entries Retrived!!"
            })
        }
    })
}