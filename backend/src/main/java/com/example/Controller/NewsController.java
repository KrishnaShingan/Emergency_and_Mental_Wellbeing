package com.example.Controller;

import org.springframework.web.bind.annotation.*;
import com.example.security.JwtTokenProvider;
import com.example.service.NewsService;
import com.example.Model.NewsArticle;
import com.example.repository.NewsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import java.util.List;

@RestController
@RequestMapping("/news") // Allow frontend requests
public class NewsController {

    @Autowired
    private NewsService newsService;

    @SuppressWarnings("unused")
    @Autowired
    private NewsRepository newsRepository;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;



    /**
     * ✅ Fetch News from External API
     */
    @GetMapping("/fetch")
    public ResponseEntity<?> fetchNews(@RequestParam String query) {
        try {
            List<NewsArticle> news = newsService.fetchNews(query);
            return ResponseEntity.ok(news);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching news: " + e.getMessage());
        }
    }

    /**
     * ✅ Save News for a User
     */
    @PostMapping("/save")
public ResponseEntity<?> saveNews(
        @RequestBody NewsArticle article,
        @RequestHeader(value = "Authorization", required = false) String token) {

    System.out.println("🛠 Received Token: " + token);  // ✅ Debug JWT token

    if (token == null || !token.startsWith("Bearer ")) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("❌ Missing or invalid token");
    }

    // ✅ Extract user email from JWT
    String email = jwtTokenProvider.getEmailFromToken(token.substring(7));
    System.out.println("🛠 Extracted Email from JWT: " + email);

    try {
        newsService.saveNewsForUser(email, article);
        return ResponseEntity.ok("✅ News article saved successfully!");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("❌ Error saving news: " + e.getMessage());
    }
}
 /**
     * ✅ Get Saved News for the Logged-in User
     */
    @GetMapping("/user")
    public ResponseEntity<List<NewsArticle>> getSavedNews(
            @RequestHeader(value = "Authorization", required = false) String token) {

        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }

        String email = jwtTokenProvider.getEmailFromToken(token.substring(7));
        List<NewsArticle> savedNews = newsService.getUserSavedNews(email);
        return ResponseEntity.ok(savedNews);
    }

    /**
     * ✅ Delete News for the Logged-in User
     */
    @DeleteMapping("/delete/{articleId}")
    public ResponseEntity<String> deleteNews(
            @PathVariable String articleId,
            @RequestHeader(value = "Authorization", required = false) String token) {
    
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("❌ Missing or invalid token");
        }
    
        String email = jwtTokenProvider.getEmailFromToken(token.substring(7));
        boolean deleted = newsService.deleteNewsForUser(email, articleId);
    
        if (deleted) {
            return ResponseEntity.ok("✅ Article deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("❌ You are not authorized to delete this article.");
        }
    }
    
    

    
    

}
