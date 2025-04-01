package com.example.repository;

import com.example.Model.NewsArticle;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface NewsRepository extends MongoRepository<NewsArticle, String> {
    List<NewsArticle> findByUserEmail(String userEmail);  // ✅ Get saved news for a user

    Optional<NewsArticle> findByUserEmailAndUrl(String userEmail, String url); // ✅ Find article for deletion

    void deleteByUserEmailAndUrl(String userEmail, String url);  // ✅ Delete specific user's news
}
