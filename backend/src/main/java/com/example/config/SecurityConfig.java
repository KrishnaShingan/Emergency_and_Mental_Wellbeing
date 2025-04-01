package com.example.config;

import java.util.Arrays;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // ✅ Disable CSRF for frontend requests
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))  // ✅ Ensure CORS applies
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.GET, "/api/assessment/history").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/assessment/**").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/api/assessment/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/profile").permitAll()
                .requestMatchers(HttpMethod.PUT, "/api/profile/update").permitAll()
                .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                .requestMatchers(HttpMethod.POST, "/auth/register").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/location/save").permitAll()
                .requestMatchers(HttpMethod.POST, "/chatbot/send").permitAll() 
                .requestMatchers(HttpMethod.GET, "/api/videos/**").permitAll() 
                .requestMatchers(HttpMethod.GET, "/api/tasks/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/tasks/**").permitAll()
                .requestMatchers(HttpMethod.PUT, "/api/tasks/**").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/api/tasks/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/news/fetch").permitAll() // ✅ Allow fetching news
                .requestMatchers(HttpMethod.POST, "/news/save").permitAll() // ✅ Allow saving news
                .requestMatchers(HttpMethod.GET, "/news/user/**").permitAll() // ✅ Allow fetching user news
                .requestMatchers(HttpMethod.DELETE, "/news/delete/**").permitAll() // ✅ Allow deleting news
                .requestMatchers(HttpMethod.GET, "/mood/history/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/mood/save").permitAll()
                .requestMatchers(HttpMethod.PUT, "/mood/update/**").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/mood/delete/**").permitAll()
                .anyRequest().permitAll())  
                
            .httpBasic(httpBasic -> httpBasic.disable());
            
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // ✅ Allow React frontend
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept"));
        configuration.setExposedHeaders(Arrays.asList("Authorization")); // ✅ Expose Auth header
        configuration.setAllowCredentials(true);
    
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    
}
