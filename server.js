import express from "express"
import cors from "cors"    
import dotenv from "dotenv"
import favicon from "serve-favicon"
import path from "path"
import UsersController from "./user.controller.js"
import ContactsController from "./contacts.controller.js"
import RelationsController from "./relations.controller.js"

const app = express()

dotenv.config()     //load the env variables
const router = express.Router()  // create Router obj

app.use(favicon(path.join(path.resolve(), "client","public", "favicon.ico")));

app.use(cors())
app.use(express.json())    // allows to accept json in the body of a request
app.use(express.urlencoded({extended: true}))

// router.route("/").get(UsersController.apiGetUsers) //creating a route
router.route("/sign-in").post(UsersController.apiSignIn )

router.route("/sign-up").post(UsersController.apiSignUp)
router.route("/user/edit").put(UsersController.apiUpdateUser)

router.route("/contact/all/:id").get(ContactsController.apiGetContacts)
router.route("/contact/add").post(ContactsController.apiPostContact)
router.route("/contact/edit").put(ContactsController.apiUpdateContact)
router.route("/contact/delete/:id").delete(ContactsController.apiDeleteContact)

router.route("/relations/all").get(RelationsController.apiGetRelations)
router.route("/relations/add").post(RelationsController.apiPostRelation)




// app.use("/api/v1/c_tracker", c_tracker)
// app.use("*", (req, res)=> res.status(404).json({error:"not found"}))

if(process.env.NODE_ENV === "production"){
        console.log("inside")
        app.use(express.static(path.join("client/build")));
        app.get("*",(req,res)=>{
            res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
        })
    }

app.listen(port ,'0.0.0.0',()=>{
    console.log(`listening on port ${port}`)})

// export default app