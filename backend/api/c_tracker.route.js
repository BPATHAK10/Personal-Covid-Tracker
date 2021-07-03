import express from "express"
import UsersController from "./user.controller.js"
import ContactsController from "./contacts.controller.js"

const router = express.Router()  // create Router obj

router.route("/").get(UsersController.apiGetUsers) //creating a route
router.route("/user/id/:id").get(UsersController.apiGetUserById)

router.route("/user/add").post(UsersController.apiPostUser)
router.route("/user/edit").put(UsersController.apiUpdateUser)


router.route("/contact/add").post(ContactsController.apiPostContact)

router.route("/contact/edit").put(ContactsController.apiUpdateContact)
router.route("/contact/delete").delete(ContactsController.apiDeleteContact)

export default router