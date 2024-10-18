const express = require("express")
const cors = require("cors")
const db = require("./DB/DB")
const app = express()

const bookingRouter = require("./Routes/bookingRouter")

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json())

app.use("/booking",bookingRouter)

db.connect(err => {
    if(err){
        console.log(err.message)
        console.log(err.code)
        console.log(err.errno)
        console.log("DB Connect : Fail")
    }else{
        console.log("DB Connect : Success")
        app.listen(3001,(err)=>{
            if(err){
                console.log("Server Start : Fail")
            }else{
                console.log("Server Start : Success")
            }
        })
    }
})
