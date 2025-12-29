package com.dpa.back.controller;

import com.dpa.back.dto.user.UserResponseDto;
import com.dpa.back.model.User;
import com.dpa.back.service.UserService;
import com.dpa.back.mapper.UserMapper; // ✅ Ajouter
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> getCurrentUser(Authentication authentication) {
        log.info("Retrieving current user profile");

        Long userId = Long.parseLong(authentication.getName());

        User user = userService.getUserById(userId);

        UserResponseDto responseDto = userMapper.toUserResponseDto(user);

        log.info("Successfully retrieved profile for user: {}", user.getUsername());

        return ResponseEntity.ok(responseDto);
    }
}