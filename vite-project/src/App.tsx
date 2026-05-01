import './App.css'
import { DialogPage } from './pages/Dialogs'
import { LoginPage } from './pages/Login'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { RegistrationPage } from './pages/Registration'
import React from 'react' 
import { useEffect } from 'react';
import { socket } from './utils/socket';
import { useMessages } from './Stors/messagesStore'; 





function App() {
  useEffect(() => {
    socket.connect(); 
    const addMessage = useMessages.getState().addMessage;

    socket.on("connect", () => {
      console.log("Ура! Мы работаем", socket.id);
    });


    socket.on("message:received", (data) => {
    console.log("Пришло сообщение от другого юзера:", data);
    addMessage(data); 
  });

    return () => {
      socket.off("message:received");
      socket.disconnect(); 
    };
  }, []);
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