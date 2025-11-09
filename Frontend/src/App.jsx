import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AuthRoutes from "../src/Components/Routing/authRoutes"
import PrivateRoutes from "../src/Components/Routing/privateRoutes"
import Signup from "../src/Pages/SignupPage/signup"
import Login from "../src/Pages/LoginPage/login"
import Dashboard from "../src/Pages/Dashboard/dashboard"
import NotFound from "../src/Pages//NotFound/NotFound"

function App() {

  return (
    <>
      <Routes>

        <Route element={<AuthRoutes />}>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>


        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
