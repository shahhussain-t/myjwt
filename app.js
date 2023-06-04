const express =require('express');
const app =express()
require('dotenv').config({path:'./config.env'})
const connectDb=require("./db/db")
const routerUser=require("./Routes/userRoute")
const port= process.env.PORT || 5000



//connectDb
connectDb()
//moddleware
app.use(express.json())
app.use('/api',routerUser)


//routes
//connnect app


// jwt token

//header
//payload
//signature



app.listen(port,()=>{
console.log(`server is runing on port ${port}`)

})

