import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"


function Registration() {


  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')


    const navigate = useNavigate()
    
    var namebox = undefined
    var fathernamebox = undefined
    var emailbox = undefined
    var phonebox = undefined
    
    const register = (e)=>{
        
        e.preventDefault()

        if(password == confirmPassword){
          
           const name = namebox.value
        const father_name = fathernamebox.value
        const email = emailbox.value
        const phone_number = phonebox.value
        const pass = password

        console.log(name,father_name,email,phone_number,pass)

        const ob = {fullname:name,fathername:father_name,email:email,phone:phone_number,password:pass}

        fetch('/api/user/register',{
            method:"post",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(ob)
        }).then(response=>response.json())
        .then(res=>{
          console.log(res)
            if(res.msg == "User Registration Successfull"){
                navigate('/')
            }
        })


        }
       

       

    }




  return (
    <>

   <div style={{height:"100vh",width:"100vw",display:"flex"}}>

   <div style={{margin:'auto'}} >

<div style={{ border: '1px solid white',borderRadius: '10px' , padding:"50px", margin:'0 auto' }} >
  <div style={{display:"flex",flexDirection:'column', justifyContent:"center",alignItems:'center'}} >


    <h2 style={{color:"white",fontSize:"40px" }} >Sign Up</h2>

     <form action="" onSubmit={(e)=>register(e)} >

     <div>
      <label style={{color:'white', fontSize:"15px", marginBottom:"9px"}}  htmlFor="fullname">Full Name</label> <br />
      <input type="text" className='form-control' ref={v=>namebox =v} placeholder='Full Name' name='fullname'  required/>
    </div> 
    <div>
      <label style={{color:'white', fontSize:"15px", marginBottom:"9px"}} htmlFor="fathername">Father Name</label><br />
      <input type="text" className='form-control' ref={v=>fathernamebox =v} name="password" id="" placeholder='fathername' required />
    </div>
    <div>
      <label style={{color:'white', fontSize:"15px", marginBottom:"9px"}} htmlFor="email">Email</label><br />
      <input type="text" className='form-control' ref={v=>emailbox =v} name="email" id="" placeholder='Email' required />
    </div>

    <label style={{color:'white', fontSize:"15px", marginBottom:"9px"}} htmlFor="phone">Phone Number:</label>

    <div style={{display:'flex',flexDirection:'row'}} >
    <input style={{width:"60px",marginRight:"2px"}}  id="country" className="form-control"  name="country" placeholder="+91">
    

  </input>
  <input type="text" onChange={(e)=> e.target.value = e.target.value.replace(/\D/g, '').substring(0, 10)} className="form-control" ref={v=>phonebox =v} id="quantity" name="quantity" placeholder="Enter a number"/>
    </div>


    <div>
      <label style={{color:'white', fontSize:"15px", marginBottom:"9px"}} htmlFor="password">Password</label><br />
      <input type="text" className='form-control' onChange={(e)=>setPassword(e.target.value)} name="password" id="" placeholder='Password' required />
    </div>


    <div>
      <label style={{color:'white', fontSize:"15px", marginBottom:"9px"}} htmlFor="confirm password">Confirm Password</label><br />
      <input type="text" onChange={(e)=>setConfirmPassword(e.target.value)} className='form-control' name="confirm password" id="" placeholder='Confirm Password' required />
      {password!=confirmPassword?<>
       <span style={{color:'red'}} >Password Don't Match</span>
      </>:''}
    </div><br />



    <div >
     <button className='form-control btn btn-success' >SignUp</button>
    </div>
     </form>


    <br />

    <h6 ><a   href=""><Link to="/" style={{color:"white"}}>Already a member?Login</Link></a></h6>


  </div>

</div>


</div>


   </div>


     
    </>
  )
}

export default Registration
