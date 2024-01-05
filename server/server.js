const express = require('express')
const server = express()
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const userRouter = require('./routers/userRouter')
const todoRouter = require('./routers/todoRouter')

server.use(express.json())
server.use(cors())

server.use('/api/user',userRouter)
server.use('/api/todos',todoRouter)


server.get('/',(req,res)=>{
    res.send("Welcome to Todo's Task")
})

server.listen(process.env.PORT,()=>{
    console.log('Server running on Port',process.env.PORT)
})
