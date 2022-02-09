
import UsersController from "./api/user.controller.js"
import ContactsController from "./api/contacts.controller.js"
import RelationsController from "./api/relations.controller.js"

// const express = require('express')
import express from "express"
import dotenv from "dotenv"

import favicon from "serve-favicon"

import cors from "cors"

import mongodb from "mongodb"
import UserDAO from "./dao/userDAO.js"
import ContactsDAO from "./dao/contactsDAO.js"
import RelationDAO from "./dao/relationsDAO.js"
import path from "path"

dotenv.config()     //load the env variables
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 5000   //get the port value from dotenv
console.log(process.env.NODE_ENV)

const app = express()

//connect to the db
MongoClient.connect(
    process.env.C_TRACKER_DB_URI,
    {
        poolSize: 50,   //50 people can connect at a time
        wtimeout: 2500, // req timeouts every 2500ms
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.catch(err =>{
    console.error(err.stack)
    process.exit(1)     
})
.then(async client => {                 // starting the web server
    await UserDAO.injectDB(client)
    await ContactsDAO.injectDB(client)
    await RelationDAO.injectDB(client)

    app.use(cors())
    app.use(express.json())    // allows to accept json in the body of a request
    app.use(express.urlencoded())

    app.use(favicon(path.join(path.resolve(), "client","public", "favicon.ico")));
    
    // console.log(process.env.NODE_ENV)
    app.route("/sign-in").post(UsersController.apiSignIn)
    app.route("/sign-up").post(UsersController.apiSignUp)
    app.route("/user/edit").put(UsersController.apiUpdateUser)
    app.route("/user/contacts/all/:id").get(ContactsController.apiGetContacts)
    app.route("/contact/add").post(ContactsController.apiPostContact)
    app.route("/contact/edit").put(ContactsController.apiUpdateContact)
    app.route("/contact/delete/:id").delete(ContactsController.apiDeleteContact)
    app.route("/relations/all").get(RelationsController.apiGetRelations)
    app.route("/relations/add").post(RelationsController.apiPostRelation)

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send(`Red Alert ${err.stack}`);
    });
    
    if(process.env.NODE_ENV == "production"){
        app.use(express.static(path.join("client/build")));
        // const path = require("path")
        app.get("*",(req,res)=>{
            res.sendFile(path.resolve(path.resolve(),'client','build','index.html'))
        })
    }
    // app.use("/api/v1/c_tracker", c_tracker)
    // app.use("*", (req, res)=> res.status(404).json({error:"not found what???????"}))
    
    
    app.listen(port,()=>{
        console.log(`listening on port ${port}`)})
})


// router.route("/").get(UsersController.apiGetUsers) //creating a route

// export default router


// export default app