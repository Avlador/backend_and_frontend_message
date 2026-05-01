import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Stors/storageAuth';
import './Login.css';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const login = useAuth((state) => state.login);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Заполните все поля');
      return;
    }

    const isSuccess = await login({ email, password });
    
    if (isSuccess) {
      navigate('/');
    } else {
      setErrorMsg('Неверный логин или пароль');
    }
  };

  return (
    <div className='color'>
        <form className='cardRegistration' onSubmit={handleLogin}>
          <h1>Логин</h1>
          {errorMsg && <div style={{ color: '#ff4d4f', margin: '-10px 0 10px 0', fontSize: '18px' }}>{errorMsg}</div>}  
        <input 
          type="email" 
          className='inputText' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введите email..."
          /> 
          <h1>Пароль</h1> 
          <input 
            type="password" 
            className='inputText' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль..."
          /> 
          
          <button type="submit" className='buttonLogin'>Войти</button>
        </form>
    </div>
  );
};