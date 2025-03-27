package com.example.Controller;

import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/videos")// ✅ Allow frontend access
public class VideoController {

    private static final Map<String, Object> cache = new ConcurrentHashMap<>();

    private static final String API_KEY = "AIzaSyCifXcry0QAOLson-T6WVCrD1GF0qcwOt4";  // ✅ Replace with a valid API key
    private static final String YOUTUBE_SEARCH_URL = 
        "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=%s&key=" + API_KEY;

    @GetMapping("/{query}")
    public ResponseEntity<Object> getVideos(@PathVariable String query) {
        // ✅ Check if the result is already cached
        if (cache.containsKey(query)) {
            System.out.println("✅ Returning cached data for " + query);
            return ResponseEntity.ok(cache.get(query));
        }

        String url = String.format(YOUTUBE_SEARCH_URL, query);
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
