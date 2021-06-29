import express from "express"
import c_trackerCtrl from "./c_tracker.controller.js"

const router = express.Router()  // create Router obj

router.route("/").get(c_trackerCtrl.apiGetUsers) //creating a route
// router.route("/id/:id").get(c_trackerCtrl.apiGetUserById)

router.route("/user/add").post(c_trackerCtrl.apiPostUser)
router.route("/user/edit").put(c_trackerCtrl.apiUpdateReview)

export default router