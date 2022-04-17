const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const register = require('./controllers/register')
const signIn = require('./controllers/signin')
const image = require('./controllers/image')
const profile = require('./controllers/profile')



// Knex database configurations
const database = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'htmlcssandjsistrue1',
      database : 'smart-brain'
    }
})



// Initialize express server
const app = express()
app.use(express.json())
app.use(cors())


app.post('/', (req, res) => {res.json(`Hey it's working`)})

// Route config for the signin entrie point
app.post('/signin', (req, res) => {signIn.handleSignIn(req, res, database, bcrypt)})


// Route config for the registration entrie point 
app.post('/register',(req, res) => {register.handleRegister(req, res, database, bcrypt)})


// Route config for the image entrie point
app.put('/image', (req, res) => {image.handleImage(req, res, database)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})


// Route config for loading a profile through the id req.param
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, database)})


// Express server port 
app.listen(process.env.PORT || 3000, () =>{
    console.log(`Server is running on port ${process.env.PORT}`)
})

