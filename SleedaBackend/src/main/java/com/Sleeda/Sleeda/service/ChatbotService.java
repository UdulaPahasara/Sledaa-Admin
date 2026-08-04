package com.Sleeda.Sleeda.service;

import com.Sleeda.Sleeda.dto.ChatbotRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@Service
public class ChatbotService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    private static final String SYSTEM_INSTRUCTION = "You are a helpful and professional virtual assistant for SLEDAA (Sri Lankan Engineering Diplomates Association of Australia).\n" +
            "SLEDAA was established in Melbourne in 1994. It is a non-profit organization dedicated to supporting Sri Lankan engineering diplomates living and working across Australia.\n" +
            "Your goals:\n" +
            "- Answer questions about SLEDAA's activities: Professional & Educational Development, Welfare & Support, Employment & Career Support, and Social & Cultural Engagement.\n" +
            "- Provide information about memberships (direct users to the 'Become A Member' page to apply).\n" +
            "- Assist users with the 'Supporting New Arrivals' programs (Can Support / Need Support).\n" +
            "- Answer politely, concisely, and accurately based on SLEDAA's mission.\n" +
            "- Use a friendly, professional tone. If you don't know an answer, advise the user to contact the team via the 'Contact Us' page or email info@sledaa.com.\n" +
            "Do not use markdown headers, keep responses conversational and brief.";

    public String askGemini(ChatbotRequest request) {
        String url = apiUrl + "?key=" + apiKey;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Build contents array
        List<Map<String, Object>> contents = new ArrayList<>();
        
        // Add history
        if (request.getHistory() != null) {
            for (ChatbotRequest.ChatMessage msg : request.getHistory()) {
                Map<String, Object> content = new HashMap<>();
                content.put("role", msg.getRole());
                Map<String, String> part = new HashMap<>();
                part.put("text", msg.getText());
                content.put("parts", Collections.singletonList(part));
                contents.add(content);
            }
        }

        // Add current message
        Map<String, Object> currentContent = new HashMap<>();
        currentContent.put("role", "user");
        Map<String, String> currentPart = new HashMap<>();
        currentPart.put("text", request.getMessage());
        currentContent.put("parts", Collections.singletonList(currentPart));
        contents.add(currentContent);

        // System Instruction
        Map<String, Object> sysInstruction = new HashMap<>();
        Map<String, String> sysPart = new HashMap<>();
        sysPart.put("text", SYSTEM_INSTRUCTION);
        sysInstruction.put("parts", Collections.singletonList(sysPart));
        sysInstruction.put("role", "system");

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", contents);
        requestBody.put("systemInstruction", sysInstruction);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);
            Map<String, Object> body = response.getBody();
            if (body != null && body.containsKey("candidates")) {
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) body.get("candidates");
                if (!candidates.isEmpty()) {
                    Map<String, Object> candidate = candidates.get(0);
                    Map<String, Object> content = (Map<String, Object>) candidate.get("content");
                    List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                    if (!parts.isEmpty()) {
                        return (String) parts.get(0).get("text");
                    }
                }
            }
            return "Sorry, I couldn't generate a response. Please try again.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error communicating with the AI service. Please check your backend connection.";
        }
    }
}
