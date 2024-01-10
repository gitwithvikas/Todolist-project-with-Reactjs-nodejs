// import Login from "./components/login"
import { useEffect, useState } from "react"
import Login from "./components/login"
import Registration from "./components/registeration"
import { Routes, Route, redirect, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addTodo, fetchAllData } from "./reduxStore/slice"
import Dashboard from "./components/dashboard"



function App() {
  

  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {

    var userToken = localStorage.getItem('userToken')

    if (!userToken || window.location.pathname === '/dashboard' && !userToken ) {
      navigate('/');
    }
    else{
      navigate('/dashboard')
    }

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
