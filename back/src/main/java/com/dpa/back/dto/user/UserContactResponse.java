package com.dpa.back.dto.user;

import com.dpa.back.enums.UserCategory;
import com.dpa.back.enums.UserRank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserContactResponse {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String role;
    private UserCategory category;
    private UserRank rank;
    private String avatarUrl;
    private boolean favorite;
}
