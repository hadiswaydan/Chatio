export default function ChatMessage({ message, isSelf }) {
  const isSystem = message.sender === "System";

  const baseStyle =
    "max-w-xs px-4 py-2 rounded-lg shadow text-white break-words whitespace-pre-wrap";

  const className = isSystem
    ? `bg-gray-400 mx-auto text-center ${baseStyle}`
    : isSelf
    ? `bg-blue-500 ml-auto ${baseStyle}`
    : `bg-gray-700 ${baseStyle}`;

  return (
    <div className={className}>
      {!isSelf && !isSystem && (
        <div className="text-sm font-bold">{message.sender}</div>
      )}
      <div>{message.text}</div>
    </div>
  );
}
