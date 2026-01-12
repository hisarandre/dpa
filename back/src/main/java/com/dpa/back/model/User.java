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
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

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
    private UserCategory category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRank rank = UserRank.MEMBER;

    @Column(nullable = false)
    private Integer currentMoney = 100;

    // general info
    private String pronoun;
    private Date birthdate;
    private String nationality;
    private String job;

    //body
    private String tattoo;
    private Integer height;
    private Double weight;
    private String eyeColor;
    private String[] hairColors;
    private String skinTone;

    //weapon
    private String accessories;
    private String weapon1;
    private String weapon2;

    // images
    private String avatarUrl;
    private String referenceImageUrl;
    private LocalDate referenceUploadDate;
    private String tagUrl;


    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt = LocalDateTime.now();

    // L'utilisateur peut avoir plusieurs favoris
    @ManyToMany
    @JoinTable(
            name = "user_favorites",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "favorite_user_id")
    )
    private Set<User> favorites = new HashSet<>();

    // Et être favori de plusieurs utilisateurs
    @ManyToMany(mappedBy = "favorites")
    private Set<User> favoritedBy = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User user)) return false;
        return id != null && id.equals(user.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}