package com.example.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Document(collection = "news")  // ✅ MongoDB Collection Name
public class NewsArticle {

    @Id // ✅ Unique Identifier for MongoDB
    private String id;

    @JsonProperty("title")
    private String title;

    @JsonProperty("description")
    private String description;

    @JsonProperty("url")
    private String url;

    @JsonProperty("urlToImage")
    private String urlToImage;

    @JsonProperty("publishedAt")
    private String publishedAt;

    @JsonProperty("source")
    private Source source;

    private String userEmail;  // ✅ New field to associate news with a user

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Source {
        @JsonProperty("name")
        private String name;
    }
}
