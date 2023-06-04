const express=require('express')
const router=express.Router()

const {createUser,login,verfiy,finduser,findSingleUser,updateUser}=require("../controller/userController")
const {verfiyToken}=require("../middleware/jwtMidlleware")



router.get("/finduser",verfiyToken,finduser)
router.get("/findSingleUser/:id",verfiyToken,findSingleUser)
router.post("/createUser",createUser)
router.post("/login",login)

module.exports=router