package com.dpa.back.service;

import com.dpa.back.dto.auth.AuthResponse;
import com.dpa.back.dto.auth.LoginRequest;
import com.dpa.back.dto.user.UserResponseDto;
import com.dpa.back.exception.UserNotFoundException;
import com.dpa.back.model.User;
import com.dpa.back.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> UserNotFoundException.byId(id));
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> UserNotFoundException.byUserName(username));
    }
}
