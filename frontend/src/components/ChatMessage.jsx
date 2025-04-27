import React, { useState } from "react";
import { Pencil } from "lucide-react";

function ChatMessage({ message, isSelf, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);

  const baseStyle =
    "max-w-xs px-6 py-3 rounded-xl shadow-md break-words whitespace-pre-wrap transition duration-300 ease-in-out";

  const className = isSelf
    ? `bg-green-200 ml-auto text-gray-800 ${baseStyle}`
    : `bg-blue-100 text-gray-800 ${baseStyle}`;

  const formattedTime = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const handleSaveEdit = () => {
    setIsEditing(false);
    if (editedContent && editedContent.trim() !== message.content.trim()) {
      onEdit(message, editedContent);
    }
    else {
      setEditedContent(message.content);
    }
  };

  return (
    <div className={className}>
      {!isSelf && (
        <div className="text-sm font-medium text-gray-600 mb-1">
          {message.sender}
        </div>
      )}

      {isEditing ? (
        <input
          type="text"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          onBlur={handleSaveEdit}
          onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
          className="w-full bg-transparent border-b border-gray-400 focus:outline-none text-base"
          autoFocus
        />
      ) : (
        <div className="flex items-start justify-between gap-2">
          <div className="text-base flex-1">{message.content}</div>
          {isSelf && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-500 hover:text-gray-700 transition"
              aria-label="Edit message"
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
      {message.timestamp && (
        <div className="text-xs text-gray-500 mt-1 text-right">
          {formattedTime}
        </div>
      )}
    </div>
  );
}

export default React.memo(ChatMessage);