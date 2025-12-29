package com.dpa.back.dto.auth;

import lombok.Data;

@Data
public class RefreshTokenRequestDto {
    private String refreshToken;
}
