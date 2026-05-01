import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Stors/storageAuth'; 
import './Registration.css';

export const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(''); 




  const navigate = useNavigate();
  const register = useAuth((state) => state.register); 

  const handleRegister = async () => {
    setErrorMsg(''); 

    if (!username || !email || !password || !confirmPassword) {
        setErrorMsg("Заполните все данные");
          return;
    }

    if (confirmPassword !== password) {
       setErrorMsg('Пароли не совпадают!');
          return;
    }

    const isSuccess = await register({ username, email, password });

    if (isSuccess) {
        navigate('/login'); 
    } else {
        setErrorMsg('Ошибка регистрации. Возможно, такой email или логин уже есть.');
    }
  }

  return (
    <div className='color'>
          <div className='cardRegist'>
              {errorMsg && <div style={{ color: '#ff4d4f', marginBottom: '10px', fontSize: '18px', textAlign: 'center' }}>{errorMsg}</div>}

          <h1>Имя пользователя (Логин)</h1>
          <input type='text' value={username} onChange={e=>setUsername(e.target.value)} className='loginPol' />
          
          <h1>Email</h1>
          <input type='email' value={email} onChange={e=>setEmail(e.target.value)} className='loginPol' />
        
          <h1>Пароль</h1>
          <input type='password' value={password} onChange={e=>setPassword(e.target.value)} className='loginPol' />
        
          <h1>Подтверждение пароля</h1>
          <input type='password' value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} className='loginPol' />
         
          <button onClick={handleRegister} className='loginButtot'>Зарегистрироваться</button>
        </div>
    </div>
  );
};