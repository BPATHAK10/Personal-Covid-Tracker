import UserDAO from "../dao/userDAO.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db.js";

const secret = "test";

export default class UsersController {
  static async apiSignIn(req, res, next) {
    try {
      // const {username,password} = req.body
      // const user = await UserDAO.getUserId(username)
      // // console.log(user)
      //   if (!user) {
      //     res.status(404).json({ error: "Invalid credentials" })
      //     return
      //   }

      //   const isPasswordCorrect = await bcrypt.compare(password, user.password);
      //   // console.log("is password correct::",isPasswordCorrect)

      //   if (!isPasswordCorrect) {
      //     // console.log("incorrect")
      //     res.status(400).json({ error: "Invalid credentials" });
      //     return
      //   }

      //   const token = jwt.sign({ username: user.username, id: user._id }, secret, { expiresIn: "1h" });

      //   res.status(200).json({ "user": user, token });

      const { username, password } = req.body;
      // console.log(req.body)
      // console.log(username,password)

      const user = await pool.query(
        'SELECT * FROM "User" WHERE username = $1 AND password = $2',
        [username, password]
      );
      console.log(user);

      if (user.rows.length === 0) {
        res.status(404).json({ error: "Invalid credentials" });
        return;
      }

      // do some pswd check here

      const token = jwt.sign(
        { username: user.rows[0].username, id: user.rows[0]._id },
        secret,
        { expiresIn: "1h" }
      );
      res.status(200).json({ user: user.rows[0], token });
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiSignUp(req, res, next) {
    try {
      // const userInfo = {
      //   username: req.body.username,
      //   password: req.body.password,
      //   email: req.body.email,
      // };

      const {username,password,email,userId} = req.body;

      // const hashedPassword = await bcrypt.hash(userInfo.password, 12);
      // userInfo.password = hashedPassword;

      // console.log(userInfo)

      // const UserResponse = await UserDAO.addUser(
      //   userInfo
      // )
      // const newUser = UserResponse.ops[0]
      
      const newUser = await pool.query(
        'INSERT INTO "User" (username, email, password) VALUES($1, $2, $3) RETURNING *',
        [username, email, password]
      );

      const token = jwt.sign(
        { username: newUser.rows[0].username, id: newUser.rows[0]._id },
        secret,
        { expiresIn: "1h" }
      );

      res.status(201).json({ user: newUser.rows[0], token });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateUser(req, res, next) {
    try {
      const userId = req.body.userId;
      const userInfo = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
      };
      const updateResponse = await UserDAO.updateUser(userId, userInfo);

      var { error } = updateResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (updateResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review - user may not be original poster"
        );
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
