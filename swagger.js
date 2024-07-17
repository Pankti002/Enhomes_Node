
const swaggerAutogen = require('swagger-autogen')()
 
const outputFile = './swagger_output.json'
const endpointsFiles = ["./index.js"]

swaggerAutogen(outputFile, endpointsFiles).then(()=>{
    console.log("augen run..................");
    require("./index.js")
})



