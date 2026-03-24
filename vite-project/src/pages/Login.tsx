import './Login.css'
import './Registration.tsx'


export const LoginPage = () => {
  // const login_i = () => {
  //   if(!login || !pasword){
  //     alert('fffff')
  //     return
  //   }
  // }
   navigate('/');
  return (
    <div className='color'>
        <div className='cardRegistration'>
          <h1>Логин</h1>
          <input type="text" className='inputText' /> 
          <h1>Пароль</h1> 
          <input type="text" className='inputText' /> 
          <button className='buttonLogin'>Войти</button>
        </div>
    </div>

  );
};