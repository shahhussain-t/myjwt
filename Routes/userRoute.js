const express=require('express')
const router=express.Router()

const {createUser,login,verfiy,finduser}=require("../controller/userController")
const {verfiyToken}=require("../middleware/jwtMidlleware")



router.get("/finduser",verfiyToken,finduser)
router.post("/createUser",createUser)
router.post("/login",login)
router.post("/verfiy",verfiy)

module.exports=router