const jwt=require("jsonwebtoken")
const { verfiy } = require("../controller/userController")


const secretKey="sheraz"



const jwtAuthorzation={

    sign(payload){

        const token=jwt.sign(payload,secretKey)
        return token
    }
,

verfiyToken(req,res,next){

const token=req.headers.authorization?.split(' ')[1]



if(!token){

    return res.status(401).json({message:"no token provided"})
}



try{
    const decode=jwt.verify(token,secretKey)
    console.log(decode)
    req.userId=decode.userId
    next()

}catch(error){
return res.status(401).json({message:"Invalid token"})


}

}

}

    // verfiy(payload){

    //     const token=jwt.verify(payload,secretKey)
    //     return token
    // }






module.exports=jwtAuthorzation