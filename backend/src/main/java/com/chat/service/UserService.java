package com.chat.service;

import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserService {
    private final Set<String> activeUsers = ConcurrentHashMap.newKeySet();

    public boolean isUsernameTaken(String username) {
        return activeUsers.contains(username);
    }

    public boolean registerUsername(String username) {
        return activeUsers.add(username);
    }

    public void removeUsername(String username) {
        activeUsers.remove(username);
    }

    public Set<String> getActiveUsers() {
        return activeUsers;
    }
}
