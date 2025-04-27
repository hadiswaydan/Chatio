package com.chat.controller;

import java.util.UUID;
import com.chat.model.Message;

import java.util.ArrayList;
import java.util.List;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ChatController {

    private ArrayList<Message> messages = new ArrayList<>();

    /**
     * Handles incoming messages from clients and broadcasts them to all connected
     * clients.
     *
     * @param message The incoming message from a client.
     * @return The same message to be sent to all connected clients.
     */
    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public Message sendMessage(Message message) {
        System.out.println("Received message: " + message.getContent());
        message.setId(UUID.randomUUID());
        messages.add(message);
        return message;
    }

    /**
     * Retrieves the list of all messages sent in the chat.
     *
     * @return The list of messages.
     */
    @GetMapping("/messages")
    public List<Message> getMessages() {
        return messages;
    }

    /**
     * Clears the chat messages every day at midnight.
     */
    @Scheduled(cron = "0 0 0 * * *")
    public void clearMessagesDaily() {
        messages.clear();
    }

    /**
     * Edit a message
     */
    @MessageMapping("/edit")
    @SendTo("/topic/messages")
    public Message editMessage(Message message) {
        int index = -1;
        for (int i = 0; i < messages.size(); i++) {
            if (messages.get(i).getId().equals(message.getId())) {
                index = i;
                break;
            }
        }
        if (index == -1) {
            return null;
        }
        messages.get(index).setContent(message.getContent());
        return messages.get(index);
    }
}
