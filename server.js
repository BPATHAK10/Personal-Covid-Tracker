// const express = require('express')
import express from "express"
import dotenv from "dotenv"
import path from "path"

import cors from "cors"
import c_tracker from "./api/c_tracker.route.js"       

const app = express()

app.use(cors())
app.use(express.json())    // allows to accept json in the body of a request
app.use(express.urlencoded())

// console.log(process.env.NODE_ENV)

// if(process.env.NODE_ENV == "production"){
    // console.log("inside")
    app.use(express.static(path.join("client/build")));
    // const path = require("path")
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(path.resolve(),'client','build','index.html'))
    })
// }

// app.use("/api/v1/c_tracker", c_tracker)
// app.use("/", c_tracker)
// app.use("*", (req, res)=> res.status(404).json({error:"not found what???????"}))

export default app