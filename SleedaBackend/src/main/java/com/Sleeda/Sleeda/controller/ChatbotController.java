package com.Sleeda.Sleeda.controller;

import com.Sleeda.Sleeda.dto.ChatbotRequest;
import com.Sleeda.Sleeda.dto.ChatbotResponse;
import com.Sleeda.Sleeda.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chatbot")
@CrossOrigin(origins = "*")
public class ChatbotController {

    @Autowired
    private ChatbotService chatbotService;

    @PostMapping("/ask")
    public ResponseEntity<ChatbotResponse> ask(@RequestBody ChatbotRequest request) {
        String reply = chatbotService.askGemini(request);
        return ResponseEntity.ok(new ChatbotResponse(reply));
    }
}
