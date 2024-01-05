// import Login from "./components/login"
import { useEffect } from "react"
import Login from "./components/login"
import Registration from "./components/registeration"
import { Routes, Route, redirect, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addTodo, fetchAllData } from "./reduxStore/slice"
import Dashboard from "./components/dashboard"



function App() {

  const UserLogin = useSelector(state => state.myTodoState.userStatus)

  console.log('userlogin', UserLogin)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {

    if (!UserLogin && window.location.pathname === '/dashboard') {
      navigate('/');
    }


    fetch('/api/todos/list').then(response => response.json())
      .then(res => {
        if (res.data) {
          console.log(res.data)
          dispatch(fetchAllData(res.data))
        }

      })





  }, [])






  return (
    <>




      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>






    </>
  )
}

export default App
