package com.Sleeda.Sleeda.service;

import com.Sleeda.Sleeda.dto.request.LoginRequest;
import com.Sleeda.Sleeda.dto.response.JwtResponse;
import com.Sleeda.Sleeda.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private JwtUtils jwtUtils;

    private static final String ADMIN_EMAIL = "admin@sledaa.com";
    private static final String ADMIN_PASSWORD = "admin123";

    @Override
    public JwtResponse login(LoginRequest loginRequest) {
        if (ADMIN_EMAIL.equals(loginRequest.getEmail()) && ADMIN_PASSWORD.equals(loginRequest.getPassword())) {
            String jwt = jwtUtils.generateJwtToken(loginRequest.getEmail());
            return new JwtResponse(jwt, loginRequest.getEmail(), "ROLE_ADMIN");
        }
        return null;
    }
}
