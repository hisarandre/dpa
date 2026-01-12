package com.dpa.back.service;

import com.dpa.back.dto.user.UserProfileUpdateRequest;
import com.dpa.back.enums.UserCategory;
import com.dpa.back.enums.UserFilter;
import com.dpa.back.enums.UserRank;
import com.dpa.back.exception.UserNotFoundException;
import com.dpa.back.mapper.UserMapper;
import com.dpa.back.model.User;
import com.dpa.back.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

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

    public List<User> getUsersWithFilters(Long userId, UserFilter filter, String search) {

        search = (search == null || search.isBlank())
                ? null
                : search.toLowerCase();

        return switch (filter) {
            case FAVORITES -> userRepository.findFavoritesByUserId(userId, userId, search);

            case HIGH_RANKS -> userRepository.findByRanksAndSearch(
                    List.of(UserRank.BOSS, UserRank.CAPTAIN),
                    userId,
                    search
            );

            case MELEE, FIREARM, HAND_TO_HAND, EXPLOSIVE, HACKER ->
                    userRepository.findByCategoryAndSearch(
                            UserCategory.valueOf(filter.name()),
                            userId,
                            search
                    );

            default -> userRepository.findAllWithSearch(userId, search);
        };
    }

    @Transactional
    public void toggleFavorite(Long currentUserId, Long targetUserId) {

        if (currentUserId.equals(targetUserId)) {
            throw new IllegalArgumentException("You cannot favorite yourself");
        }

        User currentUser = getUserById(currentUserId);
        User targetUser = getUserById(targetUserId);

        Set<User> favorites = currentUser.getFavorites();

        if (favorites.contains(targetUser)) {
            favorites.remove(targetUser);
        } else {
            favorites.add(targetUser);
        }
    }

}
