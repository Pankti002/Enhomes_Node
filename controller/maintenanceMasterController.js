const maintenanceMasterModel = require("../model/maintenanceMaster")
const validator = require("validator")

//add Maintenance
module.exports.addMaintenance = function (req, res) {
    let maintenanceAmount = req.body.maintenanceAmount
    let penalty = req.body.penalty

    let isError = false;
    let err = [];

    let maintenance = new maintenanceMasterModel({
        "maintenanceAmount": maintenanceAmount,
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
    let maintenanceMasterId = req.body.maintenanceMasterId
    let maintenanceAmount = req.body.maintenanceAmount
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
        maintenanceMasterModel.updateOne({ _id: maintenanceMasterId }, {
            maintenanceAmount: maintenanceAmount, penalty: penalty
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

//List Maintenance
module.exports.getAllMaintenance = function (req, res) {
    maintenanceMasterModel.find().exec(function (err, data) {
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