import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';
import { useMessages } from '../Stors/messagesStore';

export const DialogPage = () => {
  const { messages, addMessage, clearAllMessage } = useMessages(
    useShallow((state) => ({
      messages: state.messages,
      addMessage: state.addMessage,
      clearAllMessage: state.clearAllMessage,
    }))
  );

  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [text, setText] = useState('');


  const MY_USER_ID = 'currentUserId';
  const BOT_ID = 'botUserId';

  const handleSendMessage = (event?: React.FormEvent) => {
    if (event) event.preventDefault(); 

    if (!text.trim()) return; 

    const newMessage = {
      id: Date.now().toString(),
      chatId: 'someChatId',
      text: text.trim(),
      senderId: MY_USER_ID,
    };

    addMessage(newMessage);
    setText('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {

    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {

    const confirmDelete = window.confirm('Точно хочешь удалить переписку?');
    if (confirmDelete) {
      clearAllMessage();
      setIsMenuOpen(false);
    }
  };


  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (lastMessage && lastMessage.senderId === MY_USER_ID) {
      const timeoutId = setTimeout(() => {
        addMessage({
          id: Date.now().toString(),
          chatId: lastMessage.chatId,
          senderId: BOT_ID,
          text: 'дщщщщщщщщщщщщ', 
        });
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [messages, addMessage]);


  return (
    <div className="container">
      

      <div className="Navigation">
        <div className="contact">
          <button 
            className="icon1" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          ></button>
        </div>
        
        <div className="dialog_container">

          <nav className={`heder_nav ${isMenuOpen ? 'active' : 'in_active'}`}>
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
              <button onClick={handleClearChat} className="delite">Очистить</button>
            </ul>
          </nav>

          {/* Список чатов (Пока заглушки) */}
          <div className="dialog">
            <div className="cryg"></div>
            <div className="Namechat"></div>
          </div>
          <div className="dialog2">
            <div className="cryg"></div>
            <div className="Namechat"></div>
          </div>
          <div className="dialog2">
            <div className="cryg"></div>
            <div className="Namechat"></div>
          </div>
        </div>
      </div>

      <div className="chat">
        
        {/* Шапка чата */}
        <div className="topPanel">
          <div className="crygToppanel"></div>
          <p className="textNumber">Имя пользователя</p>
        </div>

        {/* Окно сообщений */}
        <div className="dialogue_window" style={{ flexGrow: 1, padding: '10px' }}>
          {messages.map((msg) => {
            const isMyMessage = msg.senderId === MY_USER_ID;
            
            return (
              <div
                key={msg.id}
                className={isMyMessage ? 'users1' : 'users2'}
                style={{ clear: 'both', marginBottom: '8px', maxWidth: '80%' }}
              >
                {msg.text}
              </div>
            );
          })}
        </div>

        {/* Поле ввода */}
        <div className="Use">
          <form onSubmit={handleSendMessage} className="Use textUse">
            <input
              type="text"
              className="text2"
              name="messageInput"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Введите сообщение..."
              autoComplete="off"
            />
            <button 
              type="submit" 
              disabled={!text.trim()} 
              style={{ marginLeft: '10px' }}
            >
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};