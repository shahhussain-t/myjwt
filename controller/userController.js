const myModel=require('../model/userModel')
const bycrypt=require('bcrypt-inzi')
const jwt=require('../middleware/jwtMidlleware')



exports.createUser=async (req,res)=>{
try{

const {name,email,password}=req.body
//chcek if user is already exist

const existing=await myModel.findOne({email})

if(existing){

    return res.status(400).json({message:"user already exist"})
}

//bad 400 bad request
//401 unotherized
//404 not found

//make sure recvive  all fields 


if(!name||!email||!password){


    return res.status(400).json({message:"All fields  required"})
}

//hashpassword
const hashpassword=await bycrypt.stringToHash(password,10)

//create user
const user=await new myModel({
    name,
    email,
    password:hashpassword
})

await user.save()
const token= await jwt.sign(req.body)
return res.status(200).json({token})



}catch(error){

    console.log(error)
return res.status(500).json({message:"internal server error"})

}

}

exports.login=async (req,res)=>{

try{
    const {email,password}=req.body;

    const user=await myModel.findOne({email})
    // verfiy hash

    const verfiyHash=await bycrypt.varifyHash(password,user.password)

    if(!verfiyHash){
        return res.status(400).json({message:"wrong password"})
    }


    return res.status(200).json(user)

}catch(error){
    return res.status(500).json({message:"interanl server error",error:error.message})
}

}

exports.verfiy=async(req,res,next)=>{

    const authHeader=req.headers['authorization']
    const token=  authheader && authHeader.split(' ')[1]
    if(token==null){

        return res.sendStatus(401)
    }


    jwt.verfiy(token,'sheraz',(err,user)=>{

        if(err) return res.sendStatus(401)


        req.user=user
        next()
    })



}


exports.finduser=async(req,res)=>{

    
    
    const alluser=await myModel.find()
    
    return res.status(200).json(alluser)
}

