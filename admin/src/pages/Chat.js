import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Chat.css'; // Update the import to the correct path of your CSS file

const clients = [
    { id: 1, name: 'Client 1' },
    { id: 2, name: 'Client 2' },
    { id: 3, name: 'Client 3' },
    { id: 4, name: 'Client 4' },
    // ... more clients
];

const ChatBox = () => {
    const [selectedClient, setSelectedClient] = useState(clients[0].id);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = (event) => {
        event.preventDefault();
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'client', clientId: selectedClient }]);
            setInput('');
        }
    };

    return (
        <div className="chat-app-container">
            <div className="client-list">
                {clients.map((client) => (
                    <div
                        key={client.id}
                        onClick={() => setSelectedClient(client.id)}
                        className={`client ${client.id === selectedClient ? 'active' : ''}`}
                    >
                        {client.name}
                    </div>
                ))}
            </div>
            <div className="chat-container">
                <div className="chat-messages">
                    {messages
                        .filter((message) => message.clientId === selectedClient)
                        .map((message, index) => (
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
                        placeholder="Text message"
                    />
                    <button type="submit" className="send-button">Send</button>
                </form>
            </div>
        </div>
    );
};

export default ChatBox;
