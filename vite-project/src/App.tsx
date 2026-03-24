import './App.css'
import { DialogPage } from './pages/Dialogs'
import { LoginPage } from './pages/Login'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { RegistrationPage } from'./pages/Registration'
import React, {useEffect} from 'react'


function App() {
  useEffect(()=>{
    const fn = async () => {
        const res = await fetch("http://localhost:3000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: "ivan1",
            email:"ivan1@gmail.com",
            password:"ivan1"
          })
        })
        console.log(res);
        const data = await res.json()
        console.log(data);
        
        
    }
    fn()
  })
  return (
    <>
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<DialogPage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path='/registration' element = {<RegistrationPage />} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>
    </>

  )
}

export default App
