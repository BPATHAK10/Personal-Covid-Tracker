import express from "express"
import UsersController from "./user.controller.js"
import ContactsController from "./contacts.controller.js"
import RelationsController from "./relations.controller.js"

const router = express.Router()  // create Router obj

// router.route("/").get(UsersController.apiGetUsers) //creating a route
router.route("/sign-in").post(UsersController.apiSignIn)

router.route("/sign-up").post(UsersController.apiSignUp)
router.route("/user/edit").put(UsersController.apiUpdateUser)

router.route("/contact/all/:id").get(ContactsController.apiGetContacts)
router.route("/contact/add").post(ContactsController.apiPostContact)
router.route("/contact/edit").put(ContactsController.apiUpdateContact)
router.route("/contact/delete/:id").delete(ContactsController.apiDeleteContact)

router.route("/relations/all").get(RelationsController.apiGetRelations)
router.route("/relations/add").post(RelationsController.apiPostRelation)

export default router