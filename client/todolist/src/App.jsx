// import Login from "./components/login"
import { useEffect } from "react"
import Login from "./components/login"
import Registration from "./components/registeration"
import { Routes,Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addTodo } from "./reduxStore/slice"
import Dashboard from "./components/dashboard"



function App() {

  const UserLogin = useSelector(state => state.myTodoState.userStatus)

    const dispatch = useDispatch()


  useEffect(()=>{

     fetch('/api/todos').then(response=>response.json())
     .then(res=>dispatch(addTodo(res)))

     

  },[])



  return (
    <>



   <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Registration/>} />
      {UserLogin? <Route path="/dashboard" element={<Dashboard/>} />
:''}
      
   </Routes>

   



     
    </>
  )
}

export default App
