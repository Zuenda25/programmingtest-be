const Pool = require('pg').Pool
const pool = new Pool({
  host: 'ec2-18-232-232-96.compute-1.amazonaws.com',
  user: 'xboikdjgbymryq',
  database: 'd6ai0hutaco5ov',
  password: '72611f16f0f9d00e8935ada8d7baf520f67af960ec8d0de41dd89079dd5256dd',
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const authUser = (request, response) => {
  const email = request.params.email;
  const password = request.params.password;

  pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email,password], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (req, res) => {
  const { email, firstname, lastname, password } = req.body

  pool.query('INSERT INTO users (email, firstname, lastname, password) VALUES ($1, $2, $3, $4)', [email, firstname, lastname, password], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`User added`)
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

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  authUser,
  createUser,
  updateUser,
  deleteUser,
}