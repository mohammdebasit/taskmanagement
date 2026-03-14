const express= require('express')
const { getAllUsers,updateUserbyEmail,deleteUserbyId, getSingleUserbyId } = require('../controllers/userController')
const { jwtcheck, isAdmin } = require('../middlewares/Authmiddleware')
const router= express.Router()



router.get('/',jwtcheck,
    isAdmin,
    getAllUsers)
router.put('/update',jwtcheck,updateUserbyEmail)
router.delete('/:id',jwtcheck,
    isAdmin,
    deleteUserbyId)
router.get('/:id',jwtcheck,getSingleUserbyId)



module.exports=router