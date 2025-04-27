export function addOrUpdateMessage(messages, message) {
  const index = messages.findIndex((msg) => msg.id === message.id);
  if (index !== -1) {
    return messages.map((msg, i) => (i === index ? message : msg));
  } else {
    return [...messages, message];
  }
}
