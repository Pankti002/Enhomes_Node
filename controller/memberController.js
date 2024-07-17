const memberModel = require("../model/memberModel")
const validator = require("validator")

//add member
module.exports.addMember = function (req, res) {

    let house = req.body.houseId
    let memberName = req.body.memberName
    let dateOfBirth = req.body.dateOfBirth
    let age = req.body.age
    let gender = req.body.gender
    let contactNo = req.body.contactNo

    let member = new memberModel({

        "house": house,
        "memberName": memberName,
        "dateOfBirth": dateOfBirth,
        "age": age,
        "gender": gender,
        "contactNo": contactNo,

    })

    let isError = false;
    let err = [];

    if (age == undefined || validator.isNumeric(age.toString()) == false) {
        isError = true;
        err.push({
            "Age Error": "Please Enter Valid Age"
        })
    }
    if (gender == undefined || gender.toLowerCase() != "male" && gender.toLowerCase() != "female") {
        isError = true;
        err.push({
            "Gender Error": "Please Enter Valid Gender"
        })
    }
    if (contactNo == undefined || validator.isNumeric(contactNo.toString()) == false || contactNo.length != 10) {
        isError = true;
        err.push({
            "ContactNo Error": "Please Enter Valid ContactNo"
        })
    }
    if (memberName == undefined || validator.isAlpha(memberName) == false || memberName.trim().length == 0) {
        isError = true;
        err.push({
            "memberName error": "Please enter member name"
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
        member.save(function (err, data) {
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
                    "msg": "Member Added!!"
                })
            }
        })
    }
}


//Update User
module.exports.updateMember = function (req, res) {
    let memberId = req.body.memberId
    let memberName = req.body.memberName
    let dateOfBirth = req.body.dateOfBirth
    let age = req.body.age
    let gender = req.body.gender
    let contactNo = req.body.contactNo

    let isError = false;
    let err = [];

    if (memberName != undefined) {
        if (validator.isAlpha(memberName) == false || memberName.trim().length == 0) {
            isError = true;
            err.push({
                "memberName error": "Please enter member name"
            })
        }
    }

    if (age != undefined) {
        if (validator.isNumeric(age.toString()) == false) {
            isError = true;
            err.push({
                "Age Error": "Please Enter Valid Age"
            })
        }
    }

    if (gender != undefined) {
        if (gender.toLowerCase() != "male" && gender.toLowerCase() != "female") {
            isError = true;
            err.push({
                "Gender Error": "Please Enter Valid Gender"
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

    if (isError) {
        res.json({
            "status": -1,
            "data": err,
            "msg": "Something went Wrong...."
        })
    }
    else {
        memberModel.updateOne({ _id: memberId }, { "memberName" : memberName, "dateOfBirth": dateOfBirth, "age": age, "gender": gender, "contactNo": contactNo }, function (err, data) {
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
                    "msg": "User Information Updated!!"
                })
            }
        })
    }
}

//Delete User
module.exports.deleteMember = function (req, res) {
    let memberId = req.params.memberId

    memberModel.deleteOne({ _id: memberId }, function (err, data) {
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
                "msg": "User Information Deleted!!"
            })
        }
    })
}


//List Mmebers
module.exports.getAllMembers = function (req, res) {
    memberModel.find().populate("house").exec(function (err, data) {
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
                "msg": "Member Retrived!!"
            })
        }
    })
}