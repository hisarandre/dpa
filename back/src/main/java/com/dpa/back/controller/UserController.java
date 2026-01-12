package com.dpa.back.controller;

import com.dpa.back.dto.user.*;
import com.dpa.back.enums.UserFilter;
import com.dpa.back.model.User;
import com.dpa.back.service.UserService;
import com.dpa.back.mapper.UserMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(Authentication authentication) {
        log.info("Retrieving current user info");

        Long userId = getUserIdFromAuth(authentication);

        User user = userService.getUserById(userId);

        UserResponse responseDto = userMapper.toUserResponseDto(user);

        log.info("Successfully retrieved info for user: {}", user.getUsername());

        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> getUserById(
            @PathVariable Long userId
    ) {
        log.info("Retrieving user info by id");

        User user = userService.getUserById(userId);

        UserResponse responseDto = userMapper.toUserResponseDto(user);

        log.info("Successfully retrieved info for user: {}", user.getUsername());

        return ResponseEntity.ok(responseDto);
    }


    @GetMapping("/me/profile")
    public ResponseEntity<UserProfileResponse> getMyProfile(Authentication authentication) {
        log.info("Retrieving current user profile");

        Long userId = getUserIdFromAuth(authentication);

        User user = userService.getUserById(userId);

        UserProfileResponse responseDto = userMapper.toUserProfileResponseDto(user);

        log.info("Successfully retrieved profile for user: {}", user.getUsername());

        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/{userId}/profile")
    public ResponseEntity<UserProfileResponse> getProfileById(
            @PathVariable Long userId
    ) {
        log.info("Retrieving user profile by Id");

        User user = userService.getUserById(userId);

        UserProfileResponse responseDto = userMapper.toUserProfileResponseDto(user);

        log.info("Successfully retrieved profile for user: {}", user.getUsername());

        return ResponseEntity.ok(responseDto);
    }

    @PatchMapping("/me/profile")
    public ResponseEntity<UserProfileResponse> updateMyProfile(
            @Valid @RequestBody UserProfileUpdateRequest request,
            Authentication authentication
    ) {

        log.info("Updating current user profile");

        Long userId = getUserIdFromAuth(authentication);

        User user = userService.updateUser(userId, request);

        UserProfileResponse responseDto = userMapper.toUserProfileResponseDto(user);

        log.info("Successfully updating profile for user: {}", user.getUsername());

        return ResponseEntity.ok(responseDto);
    }

    @PatchMapping("/me/avatar")
    public ResponseEntity<UserProfileResponse> updateAvatar(
            @RequestBody ImageUpdateRequest request,
            Authentication authentication) {
        log.info("Updating avatar for user");

        Long userId = getUserIdFromAuth(authentication);

        User user = userService.updateUserAvatar(userId, request.getUrl());

        UserProfileResponse responseDto = userMapper.toUserProfileResponseDto(user);

        log.info("Successfully updated avatar for user: {}", user.getUsername());

        return ResponseEntity.ok(responseDto);
    }

    @PatchMapping("/me/reference")
    public ResponseEntity<UserProfileResponse> updateReference(
            @RequestBody ImageUpdateRequest request,
            Authentication authentication) {
        log.info("Updating reference for user");

        Long userId = getUserIdFromAuth(authentication);

        User user = userService.updateUserReference(userId, request.getUrl());

        UserProfileResponse responseDto = userMapper.toUserProfileResponseDto(user);

        log.info("Successfully updated reference for user: {}", user.getUsername());

        return ResponseEntity.ok(responseDto);
    }

    @PatchMapping("/me/tag")
    public ResponseEntity<UserProfileResponse> updateTag(
            @RequestBody ImageUpdateRequest request,
            Authentication authentication) {
        log.info("Updating tag for user");

        Long userId = getUserIdFromAuth(authentication);

        User user = userService.updateUserTag(userId, request.getUrl());

        UserProfileResponse responseDto = userMapper.toUserProfileResponseDto(user);

        log.info("Successfully updated tag for user: {}", user.getUsername());

        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/list")
    public ResponseEntity<List<UserContactResponse>> getUserList(
            Authentication authentication,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "FAVORITES") String filter) {
        log.info("Get user list - search: {}, filter: {}", search, filter);

        Long userId = getUserIdFromAuth(authentication);

        List<User> users = userService.getUsersWithFilters(userId, UserFilter.valueOf(filter.toUpperCase()), search);

        List<UserContactResponse> responseDto = users.stream()
                .map(user -> userMapper.toUserContactResponseDto(user, userId))
                .collect(Collectors.toList());

        log.info("Successfully retrieved {} users", users.size());

        return ResponseEntity.ok(responseDto);
    }

    @PatchMapping("/{userId}/favorite")
    public ResponseEntity<Void> toggleFavorite(
            @PathVariable Long userId,
            Authentication authentication
    ) {
        Long currentUserId = getUserIdFromAuth(authentication);

        log.info("Toggling favorite: currentUser={}, targetUser={}", currentUserId, userId);

        userService.toggleFavorite(currentUserId, userId);

        return ResponseEntity.ok().build();
    }

    private Long getUserIdFromAuth(Authentication authentication) {
        return Long.parseLong(authentication.getName());
    }
}
