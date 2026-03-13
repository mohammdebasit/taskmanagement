const express = require('express')
const cors= require('cors')
const { sequelize, dbconnect, syncDb } = require('./config/db')
const authRouter = require('./routes/authRoutes')
const User = require('./models/User')
const Task = require('./models/Task')
const Role = require('./models/Role')
const { defaultSeed } = require('./seeders/seeder')
const userRouter = require('./routes/userRoutes')
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



//relations
Role.hasMany(User)
User.belongsTo(Role)
User.hasMany(Task)
Task.belongsTo(User)
//db operations
// dbconnect()
// syncDb()
// defaultSeed()


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
