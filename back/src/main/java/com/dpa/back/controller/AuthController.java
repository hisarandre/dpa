package com.dpa.back.controller;

import com.dpa.back.dto.auth.AuthResponse;
import com.dpa.back.dto.auth.LoginRequest;
import com.dpa.back.dto.auth.RefreshTokenRequest;
import com.dpa.back.dto.auth.RegisterRequest;
import com.dpa.back.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Void> register(@Valid @RequestBody RegisterRequest request) {
        log.info("Registration attempt for username: {}", request.getEmail());

        authService.register(request);

        log.info("User registered successfully with username: {}", request.getEmail());

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        log.info("Login attempt for username: {}", request.getUsername());

        AuthResponse user = authService.login(request);

        log.info("User logged in successfully with username: {}", request.getUsername());

        return ResponseEntity.ok(user);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestBody RefreshTokenRequest request) {
        AuthResponse response = authService.refreshToken(request.getRefreshToken());
        return ResponseEntity.ok(response);
    }
}