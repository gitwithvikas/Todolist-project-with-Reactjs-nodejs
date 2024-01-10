import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { updateUser } from "../reduxStore/slice"
import { useState } from "react"


function Login() {

  
  const [errorMsg,setErrorMsg] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    var emailbox = undefined
    var passbox = undefined

    const login = (e) =>{
        
        e.preventDefault()

        const email = emailbox.value
        const password = passbox.value

        const ob = {email:email,password:password}
   
        
        fetch('/api/user/login',{
            method:"post",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(ob)
        }).then(response=>response.json())
        .then(res=>{
            if(res.msg == "User Login Successfull..."){ 
                navigate('/dashboard')
                localStorage.setItem('userToken',JSON.stringify(res.token))
            }
            else{
              setErrorMsg(res.msg)
              setTimeout(() => {
                setErrorMsg('')
              }, 3000);
            }
        })

    }

  return (
    <>

   <div style={{height:"100vh",width:"100vw",display:"flex"}}>

   <div style={{margin:'auto'}} >

<div style={{ border: '1px solid white',borderRadius: '10px' , padding:"50px", margin:'0 auto' }} >
  <div style={{display:"flex",flexDirection:'column', justifyContent:"center",alignItems:'center'}} >


    <h2 style={{color:"white",fontSize:"40px" }} >Login</h2>

     <form action="" onSubmit={(e)=>login(e)}>

     <div>
      <label  htmlFor="email">Email</label> <br />
      <input type="text" className='form-control' ref={v=>emailbox =v} placeholder='Email' name='Email' required/>
    </div> 
    <div>
      <label htmlFor="password">Password</label><br />
      <input type="text" className='form-control'  ref={v=>passbox =v}  name="password" id="" placeholder='Password' required />
    </div><br />

    

    <div>
     <button className='form-control btn btn-success'   >Login</button>
    </div>

    {errorMsg?<>
      <span style={{color:"red"}}>{errorMsg}</span>
      </>:''}

     </form>

    <br />

    <h6 ><a  href=""><Link to='/register' style={{color:"white"}} >Not a Member?SignUp</Link></a></h6>


  </div>

</div>


</div>


   </div>


     
    </>
  )
}

export default Login
