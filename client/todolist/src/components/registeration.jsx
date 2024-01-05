import { Link, useNavigate } from "react-router-dom"


function Registration() {


    const navigate = useNavigate()
    
    var namebox = undefined
    var fathernamebox = undefined
    var emailbox = undefined
    var phonebox = undefined
    var passbox = undefined
    
    const register = (e)=>{
        
        e.preventDefault()

        const name = namebox.value
        const father_name = fathernamebox.value
        const email = emailbox.value
        const phone_number = phonebox.value
        const password = passbox.value

        console.log(name,father_name,email,phone_number,password)

        const ob = {fullname:name,fathername:father_name,email:email,phone:phone_number,password:password}

        fetch('/api/user/register',{
            method:"post",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(ob)
        }).then(response=>response.json())
        .then(res=>{
            if(res.msg == "User Registration Successfull"){
                navigate('/login')
            }
        })


    }




  return (
    <>

   <div style={{height:"100vh",width:"100vw",display:"flex"}}>

   <div style={{margin:'auto'}} >

<div style={{ border: '1px solid white',borderRadius: '10px' , padding:"50px", margin:'0 auto' }} >
  <div style={{display:"flex",flexDirection:'column', justifyContent:"center",alignItems:'center'}} >


    <h2 style={{color:"white",fontSize:"40px" }} >Sign Up</h2>

     <form action=""  >

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
    <select style={{width:"60px",marginRight:"2px"}}  id="country" className="form-control" name="country">
    <option value="INDIA">+91</option>
    <option value="">+92</option>
    <option value="">+93</option>
    <option value="">+83</option>
   
  </select>
  <input type="number" className="form-control" id="quantity" name="quantity" min="1" max="100" placeholder="Enter a number"/>
    </div>


    <div>
      <label style={{color:'white', fontSize:"15px", marginBottom:"9px"}} htmlFor="password">Password</label><br />
      <input type="text" className='form-control' ref={v=>passbox =v} name="password" id="" placeholder='Password' required />
    </div><br />

    <div >
     <button className='form-control btn btn-success'onClick={(e)=>register(e)} >SignUp</button>
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
