package com.example.Controller;

import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    private static final Map<String, Object> cache = new ConcurrentHashMap<>();

    @Value("${youtube.api.key}") // ✅ Fetch from environment variable
    private String apiKey;

    @GetMapping("/{query}")
    public ResponseEntity<Object> getVideos(@PathVariable String query) {
        String youtubeSearchUrl = 
            "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=%s&key=" + apiKey;

        // ✅ Check if the result is already cached
        if (cache.containsKey(query)) {
            System.out.println("✅ Returning cached data for " + query);
            return ResponseEntity.ok(cache.get(query));
        }

        String url = String.format(youtubeSearchUrl, query);
        RestTemplate restTemplate = new RestTemplate();

        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);

            if (response != null && response.containsKey("items")) {
                cache.put(query, response);  // ✅ Store in cache
                System.out.println("🔄 Cached response for " + query);
            }

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("❌ Error fetching videos: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to fetch videos"));
        }
    }
}
