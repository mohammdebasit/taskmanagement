const express = require('express')
const jwt = require('jsonwebtoken')
const Task = require('../models/Task')
const User = require('../models/User')
const { jwtcheck } = require('../middlewares/Authmiddleware')
const router = express.Router()

router.get('/', jwtcheck,async (req, res) => {
    //admin
    const payload = jwt.decode(req.headers.authorization.split(' ')[1])

    const role = payload.role
    if (role == 'Admin') {
        const allTasks = await Task.count()
        const inProgressTasks = await Task.count({ where: { status: "in progress" } })
        const notStartedTasks = await Task.count({ where: { status: "not started" } })
        const unAssingedTasks = await Task.count({ where: { UserId: null } })
        const completedTasks = await Task.count({ where: { status: "completed" } })
        res.json({ allTasks, inProgressTasks, notStartedTasks, unAssingedTasks, completedTasks })
    } else {
        const user = await User.findOne({ where: { email: payload.email } })
        const allTasks = await Task.count({ where: { UserId: user.id } })
        const inProgressTasks = await Task.count({ where: { status: "in progress", UserId: user.id } })
        const notStartedTasks = await Task.count({ where: { status: "not started", UserId: user.id } })
        const completedTasks = await Task.count({ where: { status: "completed", UserId: user.id } })
        res.json({ allTasks, inProgressTasks, notStartedTasks, completedTasks })
    }

})



// admin dash:
// chart



module.exports = router