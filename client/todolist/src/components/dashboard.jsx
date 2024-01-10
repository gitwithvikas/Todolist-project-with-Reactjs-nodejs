
import { useEffect, useId, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { addTodo, deleteTodo, fetchAllData, updateUserTodo } from "../reduxStore/slice";
import { FaCheckSquare } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { RiPencilFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";




function Dashboard() {

  const navigate = useNavigate()

  const mytodos = useSelector(state => state.myTodoState.value)
  

  const dispatch = useDispatch()

  const [updateDate, setUpdateData] = useState(false)
  const [updateId, setUpdateId] = useState('')

  const [filterData, updateFilterData] = useState('')

  // hover 
  const [isHovered, setHover] = useState('')
  const [isHoveredTodo, setHoverTodo] = useState('')



  const [todoPerPage, setTodoPerPage] = useState(3)

  //This is for creating number in base of page 
  const numOfTotalPages = Math.ceil(mytodos.length / todoPerPage)
  const pages = [...Array(numOfTotalPages + 1).fill(0).keys()].slice(1)

  const [currentPage, setCurrentPage] = useState(1)
  const indexOfLastPage = currentPage * todoPerPage
  const indexOfFirstPage = indexOfLastPage - todoPerPage



  // for searching data | filtered data 
  const searchFilterData = mytodos.filter((ob) => ob.discription.toLowerCase().includes(filterData.toLowerCase()))


  const visibleTodos = searchFilterData.slice(indexOfFirstPage, indexOfLastPage)


  const deleteMyTodo = (id) => {



    fetch('/api/todos/delete', {
      method: "delete",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ id: id })
    }).then(response => response.json())
      .then(res => {
        
        if (res.msg == 'Successfull Deleted') {
          dispatch(deleteTodo(id))
        }

      })

  }




  var todobox = undefined

  const addNewTodo = (e) => {

    e.preventDefault()

    var dis = todobox.value

    var ob = { discription: dis }

    console.log(ob)

    fetch('/api/todos/save', {
      method: "post",
      headers: {
        "Content-type": "application/json",
        "authorization": 'Token ' + JSON.parse(localStorage.getItem('userToken'))
      },
      body: JSON.stringify(ob)
    }).then(response => response.json())
      .then(res => {
        console.log(res)
        if (res.msg == "saved successfully") {
          dispatch(addTodo(res.result))
          todobox.value = ''
        }

      })


  }


  const updateTodo = (ob) => {

    if (ob) {

      todobox.value = ob.discription
      setUpdateData(true)
      setUpdateId(ob.id)
    }

    if (updateDate) {

      var newValue = todobox.value

      var newOb = { id: updateId, discription: newValue }

 

      fetch('/api/todos/update', {
        method: "put",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(newOb)
      }).then(response => response.json())
        .then(res => {
          console.log(res)
          if (res.msg == "update successfully") {
            dispatch(updateUserTodo(res.result))
            todobox.value = ''
            setUpdateData(false)
          }

        })


    }


  }

  const LogOut = ()=>{
     localStorage.removeItem('userToken')
     navigate('/')
  }


  useEffect(()=>{


    fetch('/api/todos/list',{
      headers:{
        'authorization' :'Token ' + JSON.parse(localStorage.getItem('userToken'))
      }
    }).then(response => response.json())
      .then(res => {
        if (res.data) {
          dispatch(fetchAllData(res.data))
        }

      })



  },[])






  return (
    <>


      <div className="container" style={{ display: 'flex', justifyContent: "center" }} >



        <div style={{ marginTop: "70px" }}>

          {/* logout pannel */}
          <div style={{ display: "flex", justifyContent: "end" }}>
            <h4 style={{ color: "white", cursor:"pointer", textShadow:"0px 3px 8px white"}} title="If you'll logout?You can't access Dashboard" onClick={()=>LogOut()} > Logout </h4>
          </div>


          {/* heading part */}
          <div style={{ width: "50vw", margin: 'auto' }} >


            {/* heading section */}
            <div style={{ display: "flex", alignItems: "center" }} >

              <div className="icon">

                <p style={{ color: "white", fontSize: "70px" }} ><span style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "#2ceb0c" }} ><FaCheckSquare /> <span style={{ backgroundColor: "white", width: "50px", height: "40px", zIndex: "-1", position: 'absolute' }} ></span>
                </span></p>

              </div>

              <div className="heading">



                <h1 style={{ marginLeft: "10px", color: "white", fontSize: "70px" }} > To Do's </h1>


              </div>



            </div>




            {/* Search section */}

            <div style={{}}>
              <div style={{ backgroundColor: "#343a40", padding: "3px 0px 3px 15px", borderRadius: '5px' }} >
                <span style={{ color: "white", marginRight: "5px", fontSize: "20px" }}><IoIosSearch />
                </span>
                <span style={{ color: "white", marginRight: "5px" }} >|</span>

                <input type="text" onChange={(e) => updateFilterData(e.target.value)} placeholder="Search" style={{ border: "none", outline: "none", backgroundColor: "#343a40", color: "white", WebkitTextFillColor: 'white' }} />
              </div>
            </div>


          </div>



          {/* todos part */}


          <div style={{ width: "100%", margin: "40px" }}>



            {visibleTodos.map(ob => <>

              <div style={{ display: 'flex', alignItems: "center", justifyContent: 'center', marginTop: "20px" }}>



                {/* todos */}



                <div onMouseEnter={() => setHoverTodo(ob.id)} onMouseLeave={() => setHoverTodo('')} style={{ backgroundColor: isHoveredTodo == ob.id ? "white" : "#343a40", padding: "15px 20px", borderRadius: "10px", color: isHoveredTodo == ob.id ? "black" : "white", boxShadow: "#757575 1px 2px 3px 1px", marginRight: "20px" }} >
                  <p >{ob.discription}</p>
                  <span style={{ fontSize: "13px" }}>{ob.created_at}</span>
                </div>








                {/* delete button */}


                <div style={{ display: "flex" }} >
                  <span onClick={() => deleteMyTodo(ob.id)} style={{ fontSize: "25px", backgroundColor: "#d08ae1", cursor: "pointer", borderRadius: "50%", width: "50px", height: "50px", display: "flex", justifyContent: "center", alignItems: 'center' }} ><span style={{ color: "white" }}><RxCross1 /></span></span> &nbsp; &nbsp;



                  {/* update button */}
                  <span onMouseEnter={() => setHover(ob.id)} onMouseLeave={() => setHover('')} style={{ display: "flex", cursor: "pointer", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: isHovered == ob.id ? 'green' : "#343a40", borderRadius: "50%", width: "50px", height: "50px" }}>

                    <div style={{ fontSize: "22px", display: "flex", justifyContent: "center", color: "white" }} ><RiPencilFill onClick={() => updateTodo(ob)} />

                    </div>

                    <div style={{ display: "inline-block", backgroundColor: "white", width: "21px", height: "4px" }} ></div>

                  </span>


                </div>



              </div>


            </>)}

          </div >




          {/* end of todos */}



          {/* next preview buttons */}

          <div style={{ marginTop: '40px' }}>
            <span style={{ display: 'flex', justifyContent: 'center' }}>
              {pages.map(ob => (

                <button style={{ borderRadius: '50%', width: '30px', height: '30px', marginRight: '10px', backgroundColor: currentPage == ob ? '#d08ae1' : '' }} onClick={() => setCurrentPage(ob)} >{ob}</button>


              ))}

              {pages.length>0?<>
              <p style={{ color: "white", fontSize: "18px", cursor: "pointer" }}><MdOutlineKeyboardDoubleArrowRight onClick={() => setCurrentPage(currentPage + 1)} />
              </p>
              </>:''}
              
            </span>

          </div>




          {/* Add on todos   */}




          <div style={{ display: 'flex', justifyContent: "center", marginTop: "40px", marginBottom: "50px" }}>

            <div style={{ backgroundColor: "#343a40", padding: "4px 110px 4px 16px", borderRadius: '5px', marginRight: "10px" }} >
              <span ><input type="text" ref={v => todobox = v} style={{ border: "none", outline: "none", backgroundColor: "#343a40", color: "white", WebkitTextFillColor: 'white' }} placeholder="Add New Task" /> </span>


            </div>


            <div>
              <button
                style={{
                  border: "none", outline: "none", backgroundColor: "#343a40", color: "white", fontSize: "21px", borderRadius: "5px"
                }}

              >
                <FaPlus onClick={updateDate ? () => updateTodo() : (e) => addNewTodo(e)} />

              </button>
            </div>

          </div>






        </div>

      </div>





    </>
  )
}

export default Dashboard
