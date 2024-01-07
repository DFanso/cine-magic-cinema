import React, { useState, useEffect } from "react";
import "../css/Chat.css";
import io from "socket.io-client";

const socket = io(`${process.env.REACT_APP_API_PATH_CHAT}/chat`);

const ChatBox = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.emit("connectAdmin");

    socket.on("messageFromClient", (payload) => {
      if (payload && payload.clientId && payload.message) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: payload.message,
            sender: "client",
            clientId: payload.clientId,
          },
        ]);

        // Add new client to the list if not already present
        setClients((prevClients) => {
          const isClientExisting = prevClients.some(
            (client) => client.id === payload.clientId
          );
          if (!isClientExisting) {
            return [
              ...prevClients,
              { id: payload.clientId, name: `Client ${payload.clientId}` },
            ];
          }
          return prevClients;
        });

        // Automatically select the new client if no client is currently selected
        if (!selectedClient) {
          setSelectedClient(payload.clientId);
        }
      }
    });

    return () => {
      socket.off("messageFromClient");
    };
  }, [selectedClient]);

  const sendMessageToClient = (clientId, message) => {
    if (clientId && socket.connected) {
      socket.emit("sendMessageToClient", { clientId, message });
    }
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (input.trim() && selectedClient) {
      sendMessageToClient(selectedClient, input);
      setMessages([
        ...messages,
        { text: input, sender: "admin", clientId: selectedClient },
      ]);
      setInput("");
    }
  };

  return (
    <div className="chat-app-container">
      <div className="client-list">
        {clients.map((client) => (
          <div
            key={client.id}
            onClick={() => setSelectedClient(client.id)}
            className={`client ${client.id === selectedClient ? "active" : ""}`}
          >
            {client.name}
          </div>
        ))}
      </div>
      <div className="chat-container">
        {/* <div className="chat-header">
          Chat with {selectedClient ? `Client ${selectedClient}` : "a client"}
        </div> */}
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
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
