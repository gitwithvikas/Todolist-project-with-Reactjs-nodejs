
const express = require('express')

const router = express.Router()

const db = require('../config/DB')

const authUser = require('../JWT/auth')

router.post('/save',authUser,(req,res)=>{
    const data = req.body
    console.log(data)
    if(data.discription == ''){
        return res.json({msg:"Insert discription"})
    }
    else{
         db.query('insert into todos (discription,user_id,created_at) values (?,?,CURDATE()) ',[data.discription,req.loggedUser.id],(err,result)=>{
        if(err){
            return res.json({err})
        }
        else{

            db.query('SELECT * FROM todos WHERE id = LAST_INSERT_ID()', (err, insertedData) => {
                if (err) {
                    return res.json({ err });
                }
                return res.json({ msg: 'saved successfully', result: insertedData });
            });
            
            // return res.json({msg :'saved successfull',result})
        }
    })
    }
   

})


router.get('/list',authUser,(req,res)=>{

    console.log('inside list')
    const userId = req.loggedUser.id
    db.query('select * from todos where user_id = ?',[userId],(err,data)=>{
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
    db.query('delete from todos where id = ?',[id],(err,result)=>{
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
    db.query('update todos set discription = ? where id = ?',[data.discription,data.id],(err,result)=>{
        if(err){
            return res.json({err})
        }
        else{

            db.query('SELECT * FROM todos WHERE id = ?',[data.id], (err, updateDate) => {
                if (err) {
                    return res.json({ err });
                }
                return res.json({ msg: 'update successfully', result: updateDate });
            });
        
        }
    })

})

module.exports = router