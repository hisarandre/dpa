package com.dpa.back.mapper;

import com.dpa.back.dto.user.UserProfileResponse;
import com.dpa.back.dto.user.UserProfileUpdateRequest;
import com.dpa.back.dto.user.UserResponse;
import com.dpa.back.model.User;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface UserMapper {

    // Entity to DTO
    UserResponse toUserResponseDto(User user);

    UserProfileResponse toUserProfileResponseDto(User user);

    // DTO to Entity

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateUserFromRequest(UserProfileUpdateRequest request, @MappingTarget User user);

}