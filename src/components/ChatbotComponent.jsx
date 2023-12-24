import React, { useState } from 'react';
import axios from 'axios';
import './ChatbotComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChatbotComponent = () => {
  const [userMessage, setUserMessage] = useState('');
  const [botMessages, setBotMessages] = useState([]);
  const [minimized, setMinimized] = useState(false);

  const sendMessage = async () => {
    if (!userMessage.trim()) {
      // Show toastify error if input is empty
      toast.error('Please enter a message');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/chat/chatbot/', {
        option: '1',
        message: userMessage,
      });
  
      const botResponse = response.data.bot;
  
      setBotMessages([
        ...botMessages,
        { text: userMessage, type: 'sent' },
        { text: botResponse, type: 'received' },
      ]);
  
      setUserMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const toggleMinimized = () => {
    setMinimized(!minimized);
  };

  return (
    <>
      <div className="toggle-button-container">
        <button onClick={toggleMinimized} className="toggle-button">
          {minimized ? (
            <FontAwesomeIcon icon={faComments} />
          ) : (
            <FontAwesomeIcon icon={faTimes} />
          )}
        </button>
      </div>
      {!minimized && (
        <div className={`chatbot-container ${minimized ? 'minimized' : ''}`}>
          <div className="chatbot-header">Chatbot Header</div>
          <div className="chat-messages">
            {botMessages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.type === 'sent' ? 'sent' : 'received'}`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              className="user-input"
              placeholder="Type your message..."
              onKeyPress={handleKeyPress}
            />
            <button onClick={sendMessage} className="send-button">
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default ChatbotComponent;
