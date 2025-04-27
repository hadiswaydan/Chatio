package com.chat.controller;

import com.chat.service.UserService;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public ResponseEntity<?> login(@RequestParam String username) {
        username = username.trim().toLowerCase();
        if (userService.isUsernameTaken(username)) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "Username already taken"));
        }

        userService.registerUsername(username);
        return ResponseEntity.ok(Collections.singletonMap("message", "Login successful"));
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(@RequestParam String username) {
        username = username.trim().toLowerCase();
        userService.removeUsername(username);
        return ResponseEntity.ok(Collections.singletonMap("message", "logout successful"));
    }
}
