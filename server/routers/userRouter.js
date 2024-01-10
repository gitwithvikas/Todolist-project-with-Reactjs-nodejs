const express = require('express')
const router = express.Router()
const db = require('../config/DB')
const bcrypt = require('bcrypt')
const salt = 10
const jwt = require('../JWT/JWT')

router.post('/register',(req,res)=>{
    const data = req.body
    
    if(data.fullname=='' || data.fathername=='' || data.email=='' || data.phone=='',data.password==''){
        return res.status(500).json({msg:'Please fillout all Fields'})
    }else{

        db.query("select email from users where email = ? ",[data.email],(err,email)=>{
            if(email.length!=0){
                
                return res.status(400).json({msg:'Email is already used'})
            }
            else{
                bcrypt.genSalt(salt, (err, salt)=> {
        bcrypt.hash(data.password, salt,(err, hash)=> {
          
           db.query('insert into users (fullname,fathername,email,phone,password) values(?,?,?,?,?) ',[data.fullname,data.fathername,data.email,data.phone,hash],(err,result)=>{
        if(err){
            return res.json({status:false,msg:'User Registration Failed',err})
        }
        else{
            return res.status(200).json({msg : 'User Registration Successfull'})
        }
    }) 

        });
    });
            }
        })

        

    }
    
   

    
    
})



router.post("/login",(req,res)=>{

    const data = req.body
   
    db.query('select * from users WHERE email = ?' , [data.email],(err ,user)=>{
        if(err || user.length == 0){
            return res.status(600).json({status:false,msg:'Invalid Credentials !'})
        }
        else{
                
            bcrypt.compare(data.password,user[0].password,(err,usr)=>{
                if(err){
                 return res.status(600).json({status:false,msg:'Invalid Credentials !'})
                }
            
                    console.log(usr)
                    if(usr){
                        console.log(user)
                        const token = jwt.generateAccessToken(user[0].id)

                        res.status(200).json({status:true,msg:'User Login Successfull...',user,token:token})
                    }else{
                     return res.status(600).json({status:false,msg:'Invalid Credentials !'})

                    }

                
            })

        }
    })


})







module.exports = router 

