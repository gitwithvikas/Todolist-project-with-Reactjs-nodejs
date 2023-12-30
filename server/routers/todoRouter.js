
const express = require('express')

const router = express.Router()

const Db = require('../config/DB')

router.post('/save',(req,res)=>{
    const data = req.body
    console.log(data)
    Db.query('insert into todo (discription) values (?) ',[data.discription],(err,done)=>{
        if(err){
            return res.json({err})
        }
        else{
            return res.json({msg :'saved successfull'})
        }
    })

})


router.get('/list',(req,res)=>{

    console.log('inside list')
    Db.query('select * from todo',(err,data)=>{
        if(err){
            return res.json({err})
        }
        else{
            return res.json({data:data})
        }
    })
})

router.delete('/delete',(req,res)=>{
    console.log(req.body)
    const id = req.body.id
    Db.query('delete from todo where id = ?',[id],(err,result)=>{
        if(err){
            return res.json({err})
        }
        else{
            return res.json({msg:'Successfull Deleted'})
        }
    })
})


router.put('/update',(req,res)=>{
    const data = req.body
    console.log(data)
    Db.query('update todo set  discription = ? where id = ?',[data.discription,data.id],(err,done)=>{
        if(err){
            return res.json({err})
        }
        else{
            return res.json({msg :'Update successfull'})
        }
    })

})

module.exports = router