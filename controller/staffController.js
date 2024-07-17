const StaffModel = require("../model/staffModel")
const validator = require("validator")

//add Staff
module.exports.addStaff = function (req, res) {
    let staffMemberName = req.body.staffMemberName
    let type = req.body.type
    let entryTime = req.body.entryTime
    let exitTime = req.body.exitTime
    let contactNo = req.body.contactNo
    let address = req.body.address
    let agencyName = req.body.agencyName
    let agencyContactNumber = req.body.agencyContactNumber

    let isError = false;
    let err = [];


    let staff = new StaffModel({
        "staffMemberName": staffMemberName,
        "type": type,
        "entryTime": entryTime,
        "exitTime": exitTime,
        "contactNo": contactNo,
        "address": address,
        "agencyName": agencyName,
        "agencyContactNumber": agencyContactNumber
    })


    if (staffMemberName == undefined || validator.isAlpha(staffMemberName) == false || staffMemberName.trim().length == 0) {
        isError = true;
        err.push({
            "staffMemberName Error": "Please Enter Valid Name"
        })
    }
    if (type == undefined || validator.isAlpha(type) == false || type.trim().length == 0) {
        isError = true;
        err.push({
            "Type Error": "Please Enter Valid Type"
        })
    }
    let contact = contactNo.length
    if (contactNo == undefined || validator.isNumeric(contactNo.toString()) == false || contact != 10) {
        console.log(contact);
        isError = true;
        err.push({
            "ContactNo Error": "Please Enter Valid ContactNo"
        })
    }
    if (address == undefined || validator.isAlpha(address) == false || address.trim().length == 0) {
        isError = true;
        err.push({
            "Address Error": "Please Enter Valid Address"
        })
    }

    if (agencyName == undefined || validator.isAlpha(agencyName) == false || agencyName.trim().length == 0) {
        isError = true;
        err.push({
            "AgencyName Error": "Please Enter Valid Name"
        })
    }
    if (agencyContactNumber == undefined || validator.isNumeric(agencyContactNumber.toString()) == false || agencyContactNumber.length != 10) {
        isError = true;
        err.push({
            "Agency ContactNo Error": "Please Enter Valid ContactNo"
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
        staff.save(function (err, data) {
            if (err) {
                console.log(err)
                res.json({
                    "status": -1,
                    "data": err,
                    "msg": "Something went Wrong..!!"
                })
            }
            else {
                res.json({
                    "status": 200,
                    "data": data,
                    "msg": "Staff Member Added!!"
                })
            }
        })
    }
}



//update Staff
module.exports.updateStaff = function (req, res) {
    let staffId = req.body.staffId
    let staffMemberName = req.body.staffMemberName
    let type = req.body.type
    let entryTime = req.body.entryTime
    let exitTime = req.body.exitTime
    let contactNo = req.body.contactNo
    let address = req.body.address
    let agencyName = req.body.agencyName
    let agencyContactNumber = req.body.agencyContactNumber

    let isError = false;
    let err = [];

    if (staffMemberName != undefined) {
        if (validator.isAlpha(staffMemberName) == false || staffMemberName.trim().length == 0) {
            isError = true;
            err.push({
                "staffMemberName Error": "Please Enter Valid Name"
            })
        }
    }

    if (type != undefined) {
        if (validator.isAlpha(type) == false || type.trim().length == 0) {
            isError = true;
            err.push({
                "Type Error": "Please Enter Valid Type"
            })
        }
    }

    if (contactNo != undefined) {
        if (validator.isNumeric(contactNo.toString()) == false || contactNo.length != 10) {
            isError = true;
            err.push({
                "ContactNo Error": "Please Enter Valid ContactNo"
            })
        }
    }

    if (address != undefined) {
        if (validator.isAlpha(address) == false || address.trim().length == 0) {
            isError = true;
            err.push({
                "Address Error": "Please Enter Valid Address"
            })
        }
    }

    if (agencyName != undefined) {
        if (validator.isAlpha(agencyName) == false || agencyName.trim().length == 0) {
            isError = true;
            err.push({
                "AgencyName Error": "Please Enter Valid AgencyName"
            })
        }
    }

    if (agencyContactNumber != undefined) {
        if (validator.isNumeric(agencyContactNumber.toString()) == false || agencyContactNumber.length != 10) {
            isError = true;
            err.push({
                "Agency ContactNo Error": "Please Enter Valid Agency ContactNo"
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
        StaffModel.updateOne({ _id: staffId }, {
            staffMemberName: staffMemberName, type: type, entryTime: entryTime, exitTime: exitTime,
            contactNo: contactNo, address: address, agencyName: agencyName, agencyContactNumber: agencyContactNumber
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
                    "msg": "Staff Member Updated!!"
                })
            }
        })
    }

}

//Delete Staff
module.exports.deleteStaff = function (req, res) {
    let staffId = req.params.staffId

    StaffModel.deleteOne({ _id: staffId }, function (err, data) {
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
                "msg": "Staff Member Deleted!!"
            })
        }
    })

}


//List Staff
module.exports.getAllStaff = function (req, res) {
    StaffModel.find(function (err, data) {
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
                "msg": "Staff Members Retrived!!"
            })
        }
    })
}