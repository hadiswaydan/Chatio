package com.chat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // This is the endpoint clients will use to connect via WebSocket
        registry.addEndpoint("/ws")
                .setAllowedOrigins("http://localhost:5173") // Your frontend dev URL
                .withSockJS(); // Enables SockJS fallback
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // All messages whose destination starts with /app will be routed to
        // @MessageMapping methods
        registry.setApplicationDestinationPrefixes("/app");

        // Enable simple memory-based message broker for topics
        registry.enableSimpleBroker("/topic");
    }
}
