import { useState, useEffect, useRef, useContext } from "react";
import ChatMessage from "../components/ChatMessage";
import MessageInput from "../components/MessageInput";
import { LogOut } from "lucide-react";
import {
  connectWebSocket,
  disconnectWebSocket,
  editMessage,
  getMessages,
  sendMessage,
} from "../services/webservice.js";
import { UserContext } from "../context/UserProvider.jsx";
import { addOrUpdateMessage } from "../utils/utilities.js";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const { username, handleLogout } = useContext(UserContext);

  const handleNewMessage = (newMsg) => {
    setMessages((prev) => {
      const updatedMessages = addOrUpdateMessage(prev, newMsg);
      return updatedMessages;
    });
  };

  const handleEditMessage = (message, newContent) => {
    editMessage(message.id, newContent).then(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, content: newContent } : msg
        )
      );
    });
  };

  const handleSend = (text) => {
    if (text.trim() !== "") {
      sendMessage({
        sender: username,
        content: text,
        timestamp: new Date(),
      });
    }
  };

  useEffect(() => {
    connectWebSocket(handleNewMessage);
    getMessages().then((data) => setMessages(data));

    return () => {
      disconnectWebSocket();
    };
  }, []);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="flex items-center justify-between bg-white p-4 shadow-sm relative">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-teal-400 flex items-center justify-center text-white font-bold text-sm">
            {username?.charAt(0).toUpperCase()}
          </div>
          <span className="text-gray-700 font-medium">{username}</span>
        </div>
        <h1 className="relative  -translate-x-1/2 text-2xl font-semibold tracking-wide text-gray-700 animate-fade-in">
          Chat Room
        </h1>

        {/* Logout on the right */}
        <button
          onClick={handleLogout}
          className="p-2 bg-slate-400 hover:bg-slate-500 text-white rounded-full shadow-md transition"
          aria-label="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-100">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            message={msg}
            isSelf={msg.sender === username}
            onEdit={handleEditMessage}
          />
        ))}
        <div ref={bottomRef}></div>
      </div>

      <div className="p-6 bg-white shadow-t-xl">
        <MessageInput handleSend={handleSend} />
      </div>
    </div>
  );
}
