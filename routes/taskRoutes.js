const express= require('express')
const { jwtcheck, isAdmin } = require('../middlewares/Authmiddleware')
const { getTasks, createTask, assignTasks, startTaskById, endTaskById } = require('../controllers/taskController')
const router= express.Router()


router.get('/',jwtcheck,getTasks)

router.post('/',jwtcheck,isAdmin,createTask)

router.put('/:id',jwtcheck,isAdmin, assignTasks)


router.put('/:id/start',jwtcheck,startTaskById)

router.put('/:id/end',jwtcheck, endTaskById)



module.exports=router