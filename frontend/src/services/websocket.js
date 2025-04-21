import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient = null;
const SERVER_PATH = import.meta.env.VITE_SERVER_PATH;

export const connectWebSocket = (onMessageReceived) => {
  const socket = new SockJS(`${SERVER_PATH}/ws`);
  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("✅ Connected to WebSocket");

      stompClient.subscribe("/topic/messages", (message) => {
        onMessageReceived(JSON.parse(message.body));
      });
    },
    onStompError: (frame) => {
      console.error("WebSocket error:", frame.headers["message"]);
    },
  });
  stompClient.activate();
};

export const sendMessage = (message) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: "/app/chat",
      body: JSON.stringify(message),
    });
  }
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
  }
};
