package com.dpa.back.mapper;

import com.dpa.back.dto.user.UserContactResponse;
import com.dpa.back.dto.user.UserProfileResponse;
import com.dpa.back.dto.user.UserProfileUpdateRequest;
import com.dpa.back.dto.user.UserResponse;
import com.dpa.back.model.User;
import org.mapstruct.*;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface UserMapper {

    // Entity to DTO

    UserResponse toUserResponseDto(User user);

    UserProfileResponse toUserProfileResponseDto(User user);

    @Mapping(target = "favorite", expression = "java(isFavorite(user, currentUserId))")
    @Mapping(source = "user.id", target = "id")
    UserContactResponse toUserContactResponseDto(User user, Long currentUserId);

    // DTO to Entity

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateUserFromRequest(UserProfileUpdateRequest request, @MappingTarget User user);

    // Helpers

    default boolean isFavorite(User user, Long currentUserId) {
        return user.getFavoritedBy().stream()
                .anyMatch(u -> u.getId().equals(currentUserId));
    }
}