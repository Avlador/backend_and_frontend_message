
import {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import  {useMessages}  from '../Stors/messagesStore';
import { useShallow } from 'zustand/shallow';


export const DialogPage = () => {  
  const {messages,addMessage, clearAllMessage} = useMessages(useShallow((state) => ({
    messages: state.messages,
    addMessage: state.addMessage,
    clearAllMessage: state.clearAllMessage
  })));

  const [isMenuOpen, setIsMenuOpen ] = useState(false);
  const [text, setText] = useState('')

  const handleSendMessage = (event) => {
        event.preventDefault(); 
        
        if (text.trim()) {
              const newMessage = {
                id: Date.now().toString(),
                chatId: 'someChatId',
                text: text.trim(),
                senderId: 'currentUserId',
            };
              addMessage(newMessage);
            setText('');
        }
    };
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) { 
            handleSendMessage(event);
        }
      }

      const handlClearChat = ()=>{
        const confirmDelete = window.confirm
        if(confirmDelete){
          clearAllMessage();
          setIsMenuOpen(false);
        }
      }
  

    //  useEffect(() =>{
    //   const lastMessage = messages: [useMessages.length -1];
    //   if(lastMessage && lastMessage.senderId === 'currentUserId'){
    //     const timeouthId = setTimeout(() =>{
    //       const bot = {
    //         id: Date.now().toString(),
    //         chatId: lastMessage.chatId,
    //         senderId: 'botic',
    //         text: 'дщщщщщщщщщщщщ'
    //       };
    //        addMessage(bot);
    //     });
    //     return () => clearTimeout(timeouthId);
    //   }
    //  }, [messages, addMessage]);
     
useEffect(() => {
  const lastMessage = messages[messages.length - 1];

  if (lastMessage && lastMessage.senderId === 'currentUserId') {
    
    const timeoutId = setTimeout(() => {
      addMessage({
        id: Date.now().toString(),
        chatId: lastMessage.chatId,
        senderId: 'currentUseId', 
        text: 'дщщщщщщщщщщщщ' 
      });
     
      // addMessage('currentUseId');
    }, 1000); 

    
    return () => clearTimeout(timeoutId);
  }
}, [messages, addMessage]);
  return (
    <div className='container'>
      <div className='Navigation'>
        <div className='contact'>
          <button className='icon1' onClick={() => setIsMenuOpen(!isMenuOpen)}></button>
        </div>
        <div className='dialog_container'>
          <nav className={`heder_nav ${isMenuOpen ? "active" : "in_active" }`}>
            <ul className="heder_nav-list">
                <li className="heder_nav-item">
              <Link to="/profile" className="nav-link">Мой профиль</Link>
              </li> 
                 <li className="heder_nav-item">
                <Link to="/login" className="nav-link">Вход</Link> 
                    </li>
                <li className="heder_nav-item">
    
                 <Link to="/registration" className="nav-link">Регистрация</Link>
                </li>
                <button onClick={handlClearChat}>очистить</button>
            </ul>
          </nav>
          <div className='dialog'>
            <div className='cryg'></div>
            <div className='Namechat'></div>
          </div>
          <div className='dialog2'>
            <div className='cryg'></div>
            <div className='Namechat'></div>
          </div>
          <div className='dialog2'>
            <div className='cryg'></div>
            <div className='Namechat'></div>
          </div>
        </div>
      </div>
      <div className='chat'>
        <div className='topPanel'>
          <div className='crygToppanel'></div>
          <p className='textNumber'>Имя пользователя</p>
        </div>
        <div className='Use'>
           <form onSubmit={handleSendMessage} className='Use'>
                    <div className='textUse'>
                        <input 
                            type='text' 
                            className='text2' 
                            name='messageInput' 
                            value={text}
                        
                            onChange={(e) => setText(e.target.value)} 
                       
                            onKeyDown={handleKeyDown} 
                            placeholder='Введите сообщение...'
                        />
                        
                        <button type="submit" disabled={!text.trim()} style={{ marginLeft: '10px' }}>
                            Отправить
                        </button>
                    </div>
                </form>
          <div className='textUse'>
            
          </div>
        </div>
        <div className='dialogue_window' style={{ flexGrow: 1, padding: '10px' }}>
            {messages.map((msg) => (
                        <div 
                            key={msg.id} 
                            className={msg.senderId === 'currentUseId' ? 'users2' : 'users1'} 
                            style={{clear: 'both', marginBottom: '8px', maxWidth: '80%',}}
                        >
                            {msg.text}
                        </div>
                    ))}
        </div>

      </div>
    </div>
  );
}; 

