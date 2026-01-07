package com.dpa.back.service;

import com.dpa.back.dto.user.UserProfileUpdateRequest;
import com.dpa.back.exception.UserNotFoundException;
import com.dpa.back.mapper.UserMapper;
import com.dpa.back.model.User;
import com.dpa.back.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.Instant;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> UserNotFoundException.byId(id));
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> UserNotFoundException.byUserName(username));
    }

    @Transactional
    public User updateUserAvatar(Long userId, String url) {
        User user = getUserById(userId);

        user.setAvatarUrl(url);

        return userRepository.save(user);
    }

    @Transactional
    public User updateUserReference(Long userId, String url) {
        User user = getUserById(userId);

        user.setReferenceImageUrl(url);
        user.setReferenceUploadDate(LocalDate.now());

        return userRepository.save(user);
    }

    @Transactional
    public User updateUserTag(Long userId, String url) {
        User user = getUserById(userId);

        user.setTagUrl(url);

        return userRepository.save(user);
    }

    @Transactional
    public User updateUser(Long userId, UserProfileUpdateRequest request) {
        User user = getUserById(userId);

        userMapper.updateUserFromRequest(request, user);

        return userRepository.save(user);
    }
}
