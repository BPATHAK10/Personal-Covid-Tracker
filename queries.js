import { response } from "express";
import Pool from "pg";

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'covid',
    password: 'postgres',
    port: 5432,
});

const getUser = (request,response) => {
    const {username,password} = request.body
    pool.query('', (error, results) => {
        if (error){
            throw error
        }
        response.status(200).json()
    })
}

const createUser = (request,response) => {
    const {username,password} = request.body

    pool.query('',(error,results) => {
        if (error){
            throw error
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

module.exports = {
    getUser,
    createUser,
    updateUser
}