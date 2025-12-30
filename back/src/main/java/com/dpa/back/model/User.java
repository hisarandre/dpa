package com.dpa.back.model;

import com.dpa.back.enums.UserCategory;
import com.dpa.back.enums.UserRank;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, updatable = false)
    private String technicalId;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(nullable = false)
    private String role = "USER";

    @Column(nullable = false)
    private boolean isActive = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserCategory category = UserCategory.DEFAULT;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRank rank = UserRank.MEMBRE;

    @Column(nullable = false)
    private Integer currentMoney = 100;


    private String pronom;
    private Date birthdate;
    private String weapon1;
    private String weapon2;
    private String tattoo;
    private String height;
    private String physic;
    private String avatarUrl;
    private String referenceImageUrl;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt = LocalDateTime.now();

}