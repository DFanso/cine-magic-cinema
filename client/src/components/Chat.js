import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./css/Chat.css";

const API_PATH = process.env.REACT_APP_API_PATH_CHAT || "http://localhost:3000";

// Function to generate a 4-digit code
const generateFourDigitCode = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

const clientId = generateFourDigitCode();

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Connect to the server
    const newSocket = io(`${API_PATH}/chat`);
    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      // Emit an event to connect the client
      socket.emit("connectClient", { clientId });

      // Listen for incoming messages
      socket.on("messageFromAdmin", (message) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: message, sender: "server" },
        ]);
      });

      return () => {
        socket.off("messageFromAdmin");
      };
    }
  }, [socket]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (input.trim() && socket) {
      // Correctly send the message to the server
      socket.emit("sendMessageToAdmin", { clientId, message: input });

      // Add message to local state
      setMessages([...messages, { text: input, sender: "client" }]);
      setInput("");
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
    setMessages([...messages, { text: faq, sender: "client" }]);
  };

  return (
    <div className="chat-container">
      {isOpen && (
        <div className="chat-interface">
          <div className="chat-header">CINEMAGIC</div>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq"
                onClick={() => sendFaqMessage(faq)}
              >
                {faq}
              </div>
            ))}
          </div>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.sender === "server" ? "admin" : ""
                }`}
              >
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
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
        </div>
      )}
      <button className="chat-toggle" onClick={toggleChat}>
        <img src="/images/chat-3.png" alt="Chat" className="chat-icon" />
      </button>
    </div>
  );
};

export default Chat;
