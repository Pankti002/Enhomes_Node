const validator = require("validator")
const userModel = require("../model/userModel")


//forget password
module.exports.forgetPassword = function (req, res) {
    let email = req.body.email

    userModel.findOne({
        "email": email
    }, function (err, data) {
        if (err) {
            res.json({
                "status": -1,
                "data": err,
                "msg": "Something went Wrong..."
            })
        }
        else {

            console.log(data);
            if (data) {
                //otp generate
                let otp = parseInt((Math.random() * 100000));
                //mail send 
                userModel.updateOne({ "email": email }, { "otp": otp }, function (err, data) {
                    console.log("update one ");
                    console.log(err);
                    console.log(data);
                })
                res.json({
                    "status": 200,
                    "data": email,
                    "msg": "OTP successfully send to your email!!"
                })
            } else {
                res.json({
                    "status": -1,
                    "data": email,
                    "msg": "Invalid  email!!"
                })
            }
        }
    })
}


//update password 

module.exports.updatePassword = function (req, res) {

    let email = req.body.email;
    let password = req.body.password;
    let otp = req.body.otp;


    userModel.findOne({ "email": email }, function (err, data) {
        if (data) {
            if (data.otp == otp) {
                userModel.updateOne({ "email": email }, { "password": password }, function (err, data) {
                    console.log("Password modified...");
                    res.json({
                        status: 200,
                        data: email,
                        msg: "password modifed..."
                    })
                })
            } else {
                res.json({
                    status: -1,
                    data: req.body,
                    msg: "Invalid otp"
                })
            }
        }
    })
}

//add User
module.exports.addUser = function (req, res) {
    let role = req.body.role
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let dateOfBirth = req.body.dateOfBirth
    let age = req.body.age
    let gender = req.body.gender
    let contactNo = req.body.contactNo
    let email = req.body.email
    let password = req.body.password


    let user = new userModel({
        "role": role,
        "firstName": firstName,
        "lastName": lastName,
        "dateOfBirth": dateOfBirth,
        "age": age,
        "gender": gender,
        "contactNo": contactNo,
        "email": email
    })



    let isError = false;
    let err = [];

    if (firstName == undefined || validator.isAlpha(firstName) == false || firstName.trim().length == 0) {
        isError = true;
        err.push({
            "FirstName Error": "Please Enter Valid Name"
        })
    }
    if (lastName == undefined || validator.isAlpha(lastName) == false || lastName.trim().length == 0) {
        isError = true;
        err.push({
            "LastName Error": "Please Enter Valid Name"
        })
    }
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
    if (email == undefined || validator.isEmail(email) == false) {
        isError = true;
        err.push({
            "Email Error": "Please Enter Valid Email"
        })
    }

    console.log(password)

    if (isError) {
        res.json({
            "status": -1,
            "data": err,
            "msg": "Something went Wrong..."
        })
    }
    else {
        user.save(function (err, data) {
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
                    "msg": "User Added!!"
                })
            }
        })
    }
}




//Update User
module.exports.updateUser = function (req, res) {
    let userId = req.body.userId
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let dateOfBirth = req.body.dateOfBirth
    let age = req.body.age
    let gender = req.body.gender
    let contactNo = req.body.contactNo
    let email = req.body.email
    let password = req.body.password

    let isError = false;
    let err = [];

    if (firstName != undefined) {
        if (validator.isAlpha(firstName) == false || firstName.trim().length == 0) {
            isError = true;
            err.push({
                "FirstName Error": "Please Enter Valid Name"
            })
        }
    }

    if (lastName != undefined) {
        if (validator.isAlpha(lastName) == false || lastName.trim().length == 0) {
            isError = true;
            err.push({
                "LastName Error": "Please Enter Valid Name"
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

    if (email != undefined) {
        if (validator.isEmail(email) == false) {
            isError = true;
            err.push({
                "Email Error": "Please Enter Valid Email"
            })
        }
    }

    if (password != undefined) {
        if (validator.isAlpha(password) == false || password.trim().length == 0) {
            isError = true;
            err.push({
                "Password Error": "Please Enter Valid Password"
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
        userModel.updateOne({ _id: userId }, { "firstName": firstName, "lastName": lastName, "dateOfBirth": dateOfBirth, "age": age, "gender": gender, "contactNo": contactNo, "email": email }, function (err, data) {
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
module.exports.deleteUser = function (req, res) {
    let userId = req.params.userId

    userModel.deleteOne({ _id: userId }, function (err, data) {
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
module.exports.getAllUsers = function (req, res) {
    userModel.find().populate("role").exec(function (err, data) {
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
                "msg": "Users Retrived!!"
            })
        }
    })
}