import './App.css'
import { DialogPage } from './pages/Dialogs'
import { LoginPage } from './pages/Login'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { RegistrationPage } from './pages/Registration'
import React from 'react' 

function App() {
  return (
    <>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DialogPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path='/registration' element={<RegistrationPage />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </>
  )
}

export default App