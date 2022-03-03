import express from "express"
import cors from "cors"    
import dotenv from "dotenv"
import path from "path"
import UsersController from "./api/user.controller.js"
import ContactsController from "./api/contacts.controller.js"
import RelationsController from "./api/relations.controller.js"

const app = express()

dotenv.config()     //load the env variables
const port = process.env.PORT || 5000   //get the port value from dotenv
console.log(process.env.NODE_ENV)
const router = express.Router()  // create Router obj


app.use(cors())
app.use(express.json())    // allows to accept json in the body of a request
app.use(express.urlencoded({extended: true}))

// router.route("/").get(UsersController.apiGetUsers) //creating a route
router.route("/sign-in").post(UsersController.apiSignIn )

router.route("/sign-up").post(UsersController.apiSignUp)
// router.route("/user/edit").put(UsersController.apiUpdateUser)

router.route("/contact/all/:id").get(ContactsController.apiGetContacts)
router.route("/contact/add").post(ContactsController.apiPostContact)
router.route("/contact/edit").put(ContactsController.apiUpdateContact)
router.route("/contact/delete/:id").delete(ContactsController.apiDeleteContact)

router.route("/relations/all").get(RelationsController.apiGetRelations)
router.route("/relations/add").post(RelationsController.apiPostRelation)


 app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send(`Red Alert ${err.stack}`);
    });

// app.use("/api/v1/c_tracker", c_tracker)
// app.use("*", (req, res)=> res.status(404).json({error:"not found"}))

if(process.env.NODE_ENV === "production"){
        app.use(express.static(path.join("client/build")));
        app.get("*",(req,res)=>{
            res.sendFile(path.resolve(path.resolve(), 'client','build','index.html'));
        })
    }

app.listen(port ,()=>{
    console.log(`listening on port ${port}`)})

// export default app