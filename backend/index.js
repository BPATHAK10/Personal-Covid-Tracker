import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import UserDAO from "./dao/userDAO.js"
import ContactsDAO from "./dao/contactsDAO.js"

dotenv.config()     //load the env variables
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000   //get the port value from dotenv

//connect to the db
MongoClient.connect(
    process.env.C_TRACKER_DB_URI,
    {
        poolSize: 50,   //50 people can connect at a time
        wtimeout: 2500, // req timeouts every 2500ms
        useNewUrlParser: true
    }
)
.catch(err =>{
    console.error(err.stack)
    process.exit(1)     
})
.then(async client => {                 // starting the web server
    await UserDAO.injectDB(client)
    await ContactsDAO.injectDB(client)
    app.listen(port,()=>{
        console.log(`listening on port ${port}`)})
    }
)