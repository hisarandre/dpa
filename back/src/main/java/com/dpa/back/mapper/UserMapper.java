package com.dpa.back.mapper;

import com.dpa.back.dto.user.UserResponseDto;
import com.dpa.back.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    // Entity to DTO
    UserResponseDto toUserResponseDto(User user);
}