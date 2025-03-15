package com.example.service;

import com.example.Model.NewsArticle;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.example.repository.NewsRepository;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.Arrays;
import java.util.List;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class NewsService {

    @Value("${newsapi.key}") // ✅ Fetch API key from properties file
    private String apiKey;

    private final String BASE_URL = "https://newsapi.org/v2/everything";
    private final RestTemplate restTemplate = new RestTemplate();

    private final NewsRepository newsRepository; // ✅ Correct instance of repository

    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    public List<NewsArticle> fetchNews(String query) {
        String url = BASE_URL + "?q=" + query + "&apiKey=" + apiKey;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/json");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                url, HttpMethod.GET, entity, String.class);

        System.out.println("🔍 API Response JSON: " + response.getBody());

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode root = objectMapper.readTree(response.getBody());

            if (!root.has("articles")) {
                throw new RuntimeException("❌ No 'articles' field in response");
            }

            JsonNode articlesNode = root.get("articles");
            NewsArticle[] articles = objectMapper.treeToValue(articlesNode, NewsArticle[].class);
            return Arrays.asList(articles);
        } catch (Exception e) {
            System.err.println("❌ Error parsing API response: " + e.getMessage());
            throw new RuntimeException("Error parsing news data");
        }
    }

    // ✅ Fetch only the logged-in user's news
    public List<NewsArticle> getUserSavedNews(String email) {
        return newsRepository.findByUserEmail(email);  // ✅ Fetch news by user
    }

    // ✅ Save news with user email
    public void saveNewsForUser(String email, NewsArticle article) {
        article.setUserEmail(email); // ✅ Associate article with user
        newsRepository.save(article);
        System.out.println("✅ News saved for user: " + email);
    }

    // ✅ Delete news for specific user
    public boolean deleteNewsForUser(String email, String articleId) {
        if (newsRepository.findById(articleId).isPresent()) {
            newsRepository.deleteById(articleId);
            return true;
        }
        return false;
    }    
}
