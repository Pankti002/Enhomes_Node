const express = require("express")
const mongoose = require("mongoose")

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const userController = require("./controller/userController")
const roleController = require("./controller/roleController")
const staffController = require("./controller/staffController")
const maintenanceController = require("./controller/maintenanceController")
const houseController = require("./controller/houseController")
const placeController = require("./controller/placeController")
const sessionController = require("./controller/sessionController")
const feedbackController = require("./controller/feedbackController")
const eventController = require("./controller/eventController")
const memberController = require("./controller/memberController")
const nonMemebrController = require("./controller/NonMemberController")
const maintenanceMaster=require("./controller/maintenanceMasterController")


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Session Api
app.get("/session", sessionController.getAllUsers)
app.post("/login", sessionController.login)

//User Api
app.get("/user", userController.getAllUsers)
app.post("/user", userController.addUser)
app.put("/user", userController.updateUser)
app.delete("/user/:userId", userController.deleteUser)
app.post("/forgetPassword", userController.forgetPassword)
app.post("/updatepassword", userController.updatePassword)

//Role Api
app.get("/role", roleController.getAllRoles)
app.post("/role", roleController.addRole)
app.put("/role", roleController.updateRole)
app.delete("/role/:roleId", roleController.deleteRole)

//Staff Api
app.get("/staff", staffController.getAllStaff)
app.post("/staff", staffController.addStaff)
app.put("/staff", staffController.updateStaff)
app.delete("/staff/:staffId", staffController.deleteStaff)

//Maintenance Api
app.get("/maintenance", maintenanceController.getAllMaintenance)
app.post("/maintenance", maintenanceController.addMaintenance)
app.put("/maintenance", maintenanceController.updateMaintenance)
app.delete("/maintenance/:maintenanceId", maintenanceController.deleteMaintenance)

//Maintenance Master Api
app.get("/maintenanceMaster", maintenanceMaster.getAllMaintenance)
app.post("/maintenanceMaster", maintenanceMaster.addMaintenance)
app.put("/maintenanceMaster", maintenanceMaster.updateMaintenance)

//House Api
app.get("/house", houseController.getAllHouses)
app.post("/house", houseController.addHouse)
app.put("/house", houseController.updateHouse)
app.delete("/house/:houseId", houseController.deletehouse)

//Place Api
app.get("/place", placeController.getAllPlaces)
app.post("/place", placeController.addPlace)
app.put("/place", placeController.updatePlace)
app.delete("/place/:placeId", placeController.deletePlace)

//event Api
app.post("/event", eventController.addEvent)
app.put("/event", eventController.updateEvent)
app.get("/event", eventController.getAllEvents)
app.delete("/event/:eventId", eventController.deleteEvent)
app.get("/getEventByDate/:startDate/:endDate",eventController.getCheckDate)

//Feedback Api
app.post("/feedback", feedbackController.addfeedback)
app.put("/feedback", feedbackController.updatefeedback)
app.get("/feedback", feedbackController.getAllfeedback)
app.delete("/feedback/:feedbackId", feedbackController.deletefeedback)

//Member Api
app.post("/member", memberController.addMember)
app.put("/member", memberController.updateMember)
app.get("/member", memberController.getAllMembers)
app.delete("/member/:memberId", memberController.deleteMember)

//NonMember Api
app.post("/nonmember", nonMemebrController.addNonMember)
app.put("/nonmember", nonMemebrController.updateNonMember)
app.get("/nonmember", nonMemebrController.getAllNonMember)
app.delete("/nonmember/:nonmemberId", nonMemebrController.deleteNonMember)

const localDb = "mongodb://localhost/e-society-22";
//const liveDb = "mongodb+srv://janvi123:enhomes@cluster0.l3iat.mongodb.net/enhomes?retryWrites=true&w=majority";

mongoose.connect(localDb, function (err) {
    if (err) {
        console.log(err)
        console.log("Something Went Wrong....")
    }
    else {
        console.log("db Connected")
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, function (err) {
    if (err) {
        console.log(err)
        console.log("Something Went Wrong....")
    }
    else {
        console.log("Server Started 3000")
    }
})

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


//npm run swagger-autogen 

