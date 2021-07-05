import UserDAO from "../dao/userDAO.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const secret = "test"

export default class UsersController {
  // static async apiGetUsers(req, res, next) {
  //   const usersPerPage = req.query.usersPerPage ? parseInt(req.query.usersPerPage, 10) : 20
  //   const page = req.query.page ? parseInt(req.query.page, 10) : 0

  //   let filters = {}
  //   if (req.query.name) {
  //     filters.name = req.query.name
  //   }
  //   else if(req.query.id){
  //     filters.id = req.query.id
  //   }

  //   const { usersList, totalNumUsers } = await UserDAO.getUsers({
  //     filters,
  //     page,
  //     usersPerPage,
  //   })

  //   let response = {
  //     users: usersList,
  //     page: page,
  //     filters: filters,
  //     entries_per_page: usersPerPage,
  //     total_results: totalNumUsers,
  //   }
  //   res.json(response)
  // }


  static async apiSignIn(req, res, next) {
    try {
      const {username,password} = req.body
      const user = await UserDAO.getUserId(username)
      // console.log(username,password)
      // console.log(user)
        if (!user) {
          res.status(404).json({ error: "Not found" })
          return
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({ username: user.username, id: user._id }, secret, { expiresIn: "1h" });
        
        res.status(200).json({ "user": user, token });

    } catch (e) {
        console.log(`api, ${e}`)
        res.status(500).json({ error: e })
    }
}

  static async apiSignUp(req, res, next) {
    try {
      const userInfo = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      }
      
      const hashedPassword = await bcrypt.hash(userInfo.password, 12);
      userInfo.password = hashedPassword;
      
      // console.log(userInfo)
      
      const UserResponse = await UserDAO.addUser(
        userInfo
      )
      const newUser = UserResponse.ops[0]

      const token = jwt.sign( { username: newUser.username, id: newUser._id}, secret, { expiresIn: "1h" } );
      
      res.status(201).json({ "user":newUser, token });

    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateUser(req, res, next) {
    try {
      const userId = req.body.userId
      const userInfo = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      }
      const updateResponse = await UserDAO.updateUser(
        userId,
        userInfo
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