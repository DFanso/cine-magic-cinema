import React, { useState } from 'react';
import './css/Chat.css'; // Path to CSS file

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = (event) => {
    event.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'client' }]);
      setInput('');
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const faqs = [
    "What are the opening hours?",
    "How to book a ticket?",
    "Are there any discounts available?",
    // ... more FAQs
  ];

  const sendFaqMessage = (faq) => {
    setMessages([...messages, { text: faq, sender: 'client' }]);
  };

  return (
    <div className="chat-container">
      {isOpen && (
        <div className="chat-interface">
          <div className="chat-header">
            CINEMAGIC
          </div>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className="faq" onClick={() => sendFaqMessage(faq)}>
                {faq}
              </div>
            ))}
          </div>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <span className="message-text">{message.text}</span>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="message-input-container">
            <input
              type="text"
              className="message-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit" className="send-button">Send</button>
          </form>
        </div>
      )}
      <button className="chat-toggle" onClick={toggleChat}>
        <img src="/images/chat-3.png" alt="Chat" className='chat-icon' />
      </button>
    </div>
  );
};

export default Chat;
