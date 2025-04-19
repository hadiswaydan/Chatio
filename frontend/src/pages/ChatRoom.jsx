import { useState, useEffect, useRef } from "react";
import ChatMessage from "../components/ChatMessage";
import MessageInput from "../components/MessageInput";

export default function ChatRoom({ username }) {
  const [messages, setMessages] = useState([
    { sender: "System", text: "Welcome to the chat!" },
    { sender: "Alice", text: "Hey everyone 👋" },
  ]);

  const bottomRef = useRef(null);

  const handleSend = (message) => {
    setMessages((prev) => [...prev, { sender: username, text: message }]);
  };

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
