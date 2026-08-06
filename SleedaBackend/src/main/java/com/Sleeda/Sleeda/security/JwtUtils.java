package com.Sleeda.Sleeda.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {

    @Value("${sledaa.app.jwtSecret:mySecretKeyForJwtWhichMustBeAtLeast256BitsLong!!}")
    private String jwtSecret;

    @Value("${sledaa.app.jwtExpirationMs:86400000}")
    private long jwtExpirationMs;

    @Value("${sledaa.app.jwtExpirationMsRememberMe:2592000000}")
    private long jwtExpirationMsRememberMe;

    public String generateJwtToken(String email, boolean rememberMe) {
        long expirationTime = rememberMe ? jwtExpirationMsRememberMe : jwtExpirationMs;
        
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + expirationTime))
                .signWith(SignatureAlgorithm.HS256, jwtSecret)
                .compact();
    }

    public String getEmailFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (MalformedJwtException e) {
            System.err.println("Invalid JWT token: " + e.getMessage());
        } catch (ExpiredJwtException e) {
            System.err.println("JWT token is expired: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.err.println("JWT token is unsupported: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.err.println("JWT claims string is empty: " + e.getMessage());
        }

        return false;
    }
}
