package com.dpa.back.service;

import com.dpa.back.dto.auth.AuthResponse;
import com.dpa.back.dto.auth.LoginRequest;
import com.dpa.back.dto.auth.RegisterRequest;
import com.dpa.back.exception.AccountInactiveException;
import com.dpa.back.exception.UnauthorizedException;
import com.dpa.back.exception.UserAlreadyExistsException;
import com.dpa.back.exception.UserNotFoundException;
import com.dpa.back.model.User;
import com.dpa.back.repository.UserRepository;
import com.dpa.back.security.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final TechnicalIdService technicalIdService;

    public void register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new UserAlreadyExistsException("username", request.getUsername());
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException("email", request.getEmail());
        }

        try {
            // Create the new user
            String technicalId = technicalIdService.generateNextTechnicalId();

            User user = new User();
            user.setTechnicalId(technicalId);
            user.setEmail(request.getEmail());
            user.setUsername(request.getUsername());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setFirstName(request.getFirstName());
            user.setCategory(request.getCategory());
            user.setLastName(request.getLastName());
            user.setRole("USER");

            userRepository.save(user);

        } catch (Exception e) {
            throw new RuntimeException("Failed to register user", e);
        }
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));


        if (!user.isActive()) {
            throw new AccountInactiveException("Account inactive");
        }

        String token = jwtUtil.generateToken(user.getId());
        String refreshToken = jwtUtil.generateRefreshToken(user.getId());

        return new AuthResponse(
                token,
                refreshToken,
                user.isActive()
        );
    }

    public AuthResponse refreshToken(String refreshToken) {

        try {
            Claims claims = jwtUtil.parseToken(refreshToken);

            Long userId = Long.parseLong(claims.getSubject());

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> UserNotFoundException.byId(userId));

            if (!user.isActive()) {
                throw new AccountInactiveException("Account is inactive");
            }

            String newToken = jwtUtil.generateToken(user.getId());
            String newRefreshToken = jwtUtil.generateRefreshToken(user.getId());

            return new AuthResponse(
                    newToken,
                    newRefreshToken,
                    user.isActive()
            );

        } catch (ExpiredJwtException e) {
            // 🔥 refresh expiré → logout
            throw new UnauthorizedException("Refresh token expired");

        } catch (JwtException e) {
            // 🔥 refresh invalide → logout
            throw new UnauthorizedException("Invalid refresh token");
        }
    }
}