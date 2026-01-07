package com.dpa.back.dto.user;

import com.dpa.back.enums.UserCategory;
import com.dpa.back.enums.UserRank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponse {
    private Long id;
    private String technicalId;
    private String firstName;
    private String lastName;
    private String role;
    private UserCategory category;
    private UserRank rank;

    // general infos
    private String pronoun;
    private Date birthdate;
    private String nationality;
    private String job;

    // body infos
    private String tattoo;
    private Integer height;
    private Double weight;
    private String eyeColor;
    private String[] hairColors;
    private String skinTone;

    // weapon infos
    private String accessories;
    private String weapon1;
    private String weapon2;


    // images
    private String tagUrl;
    private String avatarUrl;
    private String referenceImageUrl;
    private LocalDate referenceUploadDate;
}
