package com.dpa.back.dto.auth;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    @NotBlank(message = "Username is required")
    @Setter(AccessLevel.NONE)
    private String username;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 255)
    private String password;

    // Setters personnalisés avec normalisation
    public void setUsername(String username) {
        this.username = username != null ? username.toLowerCase().trim() : null;
    }
}