package com.Sleeda.Sleeda.config;

import com.Sleeda.Sleeda.security.AuthEntryPointJwt;
import com.Sleeda.Sleeda.security.AuthTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableMethodSecurity
public class WebSecurityConfig {

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> 
                auth.requestMatchers("/api/auth/**").permitAll()
                    .requestMatchers("/uploads/**").permitAll()
                    .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/albums/**").permitAll()
                    .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/events/**").permitAll()
                    .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/news/**").permitAll()
                    .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/projects/**").permitAll()
                    .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/reports/**").permitAll()
                    .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/resources/**").permitAll()
                    .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/committee/**").permitAll()
                    .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/past-committee/**").permitAll()
                    .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/committee-covers/**").permitAll()
                    .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/past-committee-years/**").permitAll()
                    .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/past-committee-covers/**").permitAll()
                    .requestMatchers("/error").permitAll()
                    .anyRequest().authenticated()
            );

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://localhost:5174")); // Frontend dev ports
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
