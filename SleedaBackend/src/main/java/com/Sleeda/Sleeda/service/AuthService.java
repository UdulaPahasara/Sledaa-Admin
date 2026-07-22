package com.Sleeda.Sleeda.service;

import com.Sleeda.Sleeda.dto.request.LoginRequest;
import com.Sleeda.Sleeda.dto.response.JwtResponse;

public interface AuthService {
    JwtResponse login(LoginRequest loginRequest);
}
