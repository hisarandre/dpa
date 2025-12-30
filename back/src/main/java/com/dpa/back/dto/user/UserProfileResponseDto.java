package com.dpa.back.dto.user;

import com.dpa.back.enums.UserCategory;
import com.dpa.back.enums.UserRank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponseDto {
    private Long id;
    private String technicalId;
    private String firstName;
    private String lastName;
    private String role;
    private UserCategory category;
    private UserRank rank;
    private String pronom;
    private Date birthdate;
    private String weapon1;
    private String weapon2;
    private String tattoo;
    private String height;
    private String physic;
    private String avatarUrl;
    private String referenceImageUrl;
}
