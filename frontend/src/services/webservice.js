import { Client } from "@stomp/stompjs";

let stompClient = null;
const SERVER_PATH = import.meta.env.VITE_SERVER_PATH;

export const connectWebSocket = (onMessageReceived) => {
  stompClient = new Client({
    brokerURL: `${SERVER_PATH}/ws`,
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("✅ Connected to WebSocket");

      stompClient.subscribe("/topic/messages", (message) => {
        const jsonMessage = JSON.parse(message.body);
        onMessageReceived(jsonMessage);
      });
    },
    onStompError: (frame) => {
      console.error("💥 STOMP error:", frame.headers["message"]);
    },
    onWebSocketError: (event) => {
      console.error("🔌 WebSocket connection error:", event);
    },
  });

  stompClient.activate();
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
  }
};

export const sendMessage = (message) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: "/app/chat",
      body: JSON.stringify(message),
    });
  }
};

export const getMessages = async () => {
  const data = await fetch(`${SERVER_PATH}/api/messages`);
  const messages = await data.json();
  return messages;
};

export const editMessage = async (id, content) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: "/app/edit",
      body: JSON.stringify({ id, content}),
    });
  }
};
