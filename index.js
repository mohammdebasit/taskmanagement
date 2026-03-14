const express = require('express')
const cors= require('cors')
const { sequelize, dbconnect, syncDb } = require('./config/db')
const authRouter = require('./routes/authRoutes')
const User = require('./models/User')
const Task = require('./models/Task')
const Role = require('./models/Role')
const { defaultSeed, testSeed } = require('./seeders/seeder')
const userRouter = require('./routes/userRoutes')
const taskRouter = require('./routes/taskRoutes')
const dashRouter = require('./routes/dashboardRoutes')
const app = express()
const port = process.env.PORT || 4000


//middlewares
 app.use(express.json())
 app.use(express.urlencoded({extended:true}))
 app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


//routes
app.use('/auth',authRouter)
app.use('/users',userRouter)
app.use('/tasks',taskRouter)
app.use('/dashboard',dashRouter)



//relations
Role.hasMany(User)
User.belongsTo(Role)
User.hasMany(Task)
Task.belongsTo(User)
//db operations
// dbconnect()
// syncDb()
// defaultSeed()
// testSeed()


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// employee jwt:
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtcGxveWVlQGVtYWlsLmNvbSIsInJvbGUiOiJFbXBsb3llZSIsImlhdCI6MTc3MzM3ODg4Nn0.5_TWjOyBstSfnbpp2Ss5tOiUKYOAhqw05ec5ZHdNS9s

//admin jwt
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTc3MzQ3MjM3MH0.7a2xDMnoPmC2zLHzRRfCSYqB5T97xIpdyqB94OF2Dq0