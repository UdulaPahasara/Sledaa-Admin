package com.Sleeda.Sleeda.dto;

import java.util.List;
import lombok.Data;

@Data
public class ChatbotRequest {
    private String message;
    private List<ChatMessage> history;

    @Data
    public static class ChatMessage {
        private String role;
        private String text;
    }
}
