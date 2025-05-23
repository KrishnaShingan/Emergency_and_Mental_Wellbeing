package com.example.Controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@RestController
@RequestMapping("/chatbot")
public class ChatbotController {

    @Value("${gemini.api.key}")  // Load API key from properties
    private String geminiApiKey;

    private static final String GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=";

    private List<String> conversationHistory = new ArrayList<>();

    @PostMapping("/send")
    public Map<String, String> sendMessage(@RequestBody Map<String, String> request) {
        String userMessage = request.get("message");
        System.out.println("✅ Received message: " + userMessage);

        conversationHistory.add("User: " + userMessage);
        String botResponse = callGeminiAPI(userMessage);

        while (conversationHistory.contains(botResponse)) {
            botResponse = callGeminiAPI(userMessage);
        }

        conversationHistory.add("Bot: " + botResponse);

        Map<String, String> response = new HashMap<>();
        response.put("response", botResponse);
        return response;
    }

    private String callGeminiAPI(String userMessage) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String prompt = "You are a chatbot. Always provide a unique, creative response. Avoid repeating past answers.\n"
                      + "Previous responses: " + String.join(", ", conversationHistory) + "\n"
                      + "User: " + userMessage + "\nBot:";

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", List.of(
            Map.of("parts", List.of(Map.of("text", prompt)))
        ));

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(GEMINI_URL + geminiApiKey, HttpMethod.POST, entity, Map.class);
            System.out.println("Gemini API Response: " + response.getBody());

            if (response.getBody() != null && response.getBody().containsKey("candidates")) {
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.getBody().get("candidates");

                if (!candidates.isEmpty() && candidates.get(0).containsKey("content")) {
                    Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");

                    if (content.containsKey("parts")) {
                        List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");

                        if (!parts.isEmpty() && parts.get(0).containsKey("text")) {
                            return parts.get(0).get("text").toString();
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("❌ Error calling Gemini API: " + e.getMessage());
            return "⚠️ Sorry, I'm experiencing technical difficulties. Try again later.";
        }

        return "⚠️ Sorry, I couldn't generate a response.";
    }
}
