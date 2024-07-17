const RoleModel = require("../model/roleModel")
const validator = require("validator")


module.exports = function (app) {
    //addRole
    module.exports.addRole = function (req, res) {
        let roleName = req.body.roleName;

        let role = new RoleModel({
            "roleName": roleName
        })

        let isError = false
        let err = []

        if (roleName == undefined || validator.isAlpha(roleName) == false || roleName.trim().length == 0) {
            isError = true;
            err.push({
                "RoleName Error": "Please Enter Valid Name"
            })
        }


        if (isError == true) {
            console.log(err)
            res.json({
                "status": -1,
                "data": err,
                "msg": "Something went Wrong...."
            })
        }
        else {
            role.save(function (err, data) {
                if (err) {
                    console.log(err)
                    res.json({
                        "status": -1,
                        "data": rerr,
                        "msg": "Something went Wrong..."
                    })
                }
                else {
                    res.json({
                        "status": 200,
                        "data": data,
                        "msg": "Role Added!!"
                    })
                }
            })
        }
    }


    //getAllRoles
    module.exports.getAllRoles = function (req, res) {
        RoleModel.find(function (err, data) {
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
                    "msg": "Roles Retrived!!"
                })
            }
        })
    }



    //updateRole
    module.exports.updateRole = function (req, res) {
        let roleId = req.body.roleId
        let roleName = req.body.roleName

        let isError = false
        let err = []

        if (roleName != undefined) {
            if (validator.isAlpha(roleName) == false || roleName.trim().length == 0) {
                isError = true;
                err.push({
                    "RoleName Error": "Please Enter Valid Name"
                })
            }
        }

        if (isError == true) {

            res.json({
                "status": -1,
                "data": err,
                "msg": "Something went Wrong...."
            })
        }
        else {
            RoleModel.updateOne({ _id: roleId }, { roleName: req.body.roleName }, function (err, data) {
                if (err) {
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
                        "msg": "Role Updated!!"
                    })
                }
            }
            )
        }
    }



    //deleteRole
    module.exports.deleteRole = function (req, res) {
        let roleId = req.params.roleId
        RoleModel.deleteOne({ _id: roleId }, function (err, data) {
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
                    "msg": "Role Deleted!!"
                })
            }
        })
    }

}