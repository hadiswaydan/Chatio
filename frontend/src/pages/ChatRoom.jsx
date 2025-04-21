import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ChatMessage from "../components/ChatMessage";
import MessageInput from "../components/MessageInput";
import {
  connectWebSocket,
  disconnectWebSocket,
  sendMessage,
} from "../services/websocket";

export default function ChatRoom({}) {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    connectWebSocket((newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });

    return () => {
      disconnectWebSocket();
    };
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate("/");
    }
  }, []);

  const handleSend = (text) => {
    if (text.trim() !== "") {
      sendMessage({
        sender: username,
        content: text,
        timestamp: new Date(),
      });
    }
  };

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-500 text-white p-4 text-xl font-semibold shadow">
        Logged in as: {username}
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            message={msg}
            isSelf={msg.sender === username}
          />
        ))}
        <div ref={bottomRef}></div>
      </div>
      <MessageInput handleSend={handleSend} />
    </div>
  );
}
