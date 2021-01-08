const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const cors = require("cors");
const app = express()
const port = 3000

const path = __dirname + '/app/views/';

app.use(express.static(path));

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});

app.get('/api/users', db.getUsers)
app.get('/api/users/:id', db.authUser)
app.post('/api/users', db.createUser)
app.put('/api/users/:id', db.updateUser)
app.delete('/api/users/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})