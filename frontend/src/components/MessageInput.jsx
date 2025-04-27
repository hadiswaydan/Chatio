import React from "react";
import { useState } from "react";

export default function MessageInput({ handleSend }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed) {
      handleSend(trimmed);
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-2 bg-white shadow-md rounded-t-lg"
    >
      <input
        type="text"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent text-gray-700 placeholder-gray-400 transition"
      />
      <button
        type="submit"
        className="px-5 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-all duration-300"
      >
        Send
      </button>
    </form>
  );
}
