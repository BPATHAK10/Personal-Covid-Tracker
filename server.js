import express from "express"
import cors from "cors"
import c_tracker from "./api/c_tracker.route.js"       

const app = express()

app.use(cors())
app.use(express.json())    // allows to accept json in the body of a request
app.use(express.urlencoded({extended: true}))


app.use("/api/v1/c_tracker", c_tracker)
app.use("*", (req, res)=> res.status(404).json({error:"not found"}))

export default app