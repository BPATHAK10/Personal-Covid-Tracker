import UserDAO from "../dao/userDAO.js"

export default class UsersController {
  static async apiGetUsers(req, res, next) {
    const usersPerPage = req.query.usersPerPage ? parseInt(req.query.usersPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.name) {
      filters.name = req.query.name
    }
    else if(req.query.id){
      filters.id = req.query.id
    }

    const { usersList, totalNumUsers } = await UserDAO.getUsers({
      filters,
      page,
      usersPerPage,
    })

    let response = {
      users: usersList,
      page: page,
      filters: filters,
      entries_per_page: usersPerPage,
      total_results: totalNumUsers,
    }
    res.json(response)
  }

//   static async apiGetUserById(req, res, next) {
//     try {
//         let id = req.params.id || {}
//         let user = await UserDAO.getUserByID(id)
//         if (!user) {
//           res.status(404).json({ error: "Not found" })
//           return
//         }
//         res.json(user)
//     } catch (e) {
//         console.log(`api, ${e}`)
//         res.status(500).json({ error: e })
//     }
// }

  static async apiPostUser(req, res, next) {
    try {
      const location = req.body.location
      const currently_infected = req.body.currently_infected
      const userInfo = {
        username: req.body.name,
        password: req.body.password,
        email: req.body.email
      }
      const organization = req.body.organization

      const UserResponse = await UserDAO.addUser(
        userInfo, 
        location, 
        currently_infected, 
        organization
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const userId = req.body.userId
      const location = req.body.location
      const currently_infected = req.body.currently_infected
      const organization = req.body.organization

      const updateResponse = await UserDAO.updateUser(
        userId,
        location, 
        currently_infected, 
        organization
      )

      var { error } = updateResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (updateResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review - user may not be original poster",
        )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

}