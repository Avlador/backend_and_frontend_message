import { useState } from 'react';
import './Registration.css'
// import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const RegistrationPage = () => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate();
    
    const handleLogin = () => {
      
      if(!login || !email || !password || !confirmPassword){
        alert("Заполните данные")
        return;
      }
      if(confirmPassword != password){
    console.error('Пароли не совпадают!');
      alert('Пароли не совпадают!');
      return;
      }

      console.log({email, login, password, confirmPassword});
     navigate('/');
 
    }

  return (
    <div className='color'>
        <div className='cardRegist'>
          <h1>Логин</h1>
          {/* <Input/> */}
          <input type='text' value={login} onChange={e=>setLogin(e.target.value)} className='loginPol' name='yyyyy'></input>
          <h1>email</h1>
          {/* <Input/> */}
          <input type='email' value={email} onChange={e=>setEmail(e.target.value)} className='loginPol' name='yyyyy'></input>
        <h1>Пароль</h1>
        {/* <Input/> */}
        <input type='password'value={password} onChange={e=>setPassword(e.target.value)} className='loginPol' name='yyyyy'></input>
        <h1>Подтверждение пароля</h1>
        {/* <Input/> */}
         <input type='password'value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} className='loginPol' name='yyyyy'></input>
         <button onClick={handleLogin} className='loginButtot'>Зарегистрироваться</button>
        </div>
    
    </div>

  );
};
