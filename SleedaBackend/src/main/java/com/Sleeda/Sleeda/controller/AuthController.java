package com.Sleeda.Sleeda.controller;

import com.Sleeda.Sleeda.dto.request.LoginRequest;
import com.Sleeda.Sleeda.dto.response.JwtResponse;
import com.Sleeda.Sleeda.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        JwtResponse response = authService.login(loginRequest);
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body("Error: Unauthorized. Invalid credentials.");
        }
    }
}
