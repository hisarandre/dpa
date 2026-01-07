package com.dpa.back.dto.user;

import java.sql.Date;
import java.util.List;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileUpdateRequest {

    // general infos
    @Size(max = 50, message = "Le prénom doit contenir entre 1 et 50 caractères")
    private String firstName;

    @Size(max = 50, message = "Le nom doit contenir entre 1 et 50 caractères")
    private String lastName;

    @Size(max = 20, message = "Le pronom ne peut pas dépasser 20 caractères")
    private String pronoun;

    @Past(message = "La date de naissance doit être dans le passé")
    private Date birthdate;

    @Size(max = 50, message = "La nationalité ne peut pas dépasser 50 caractères")
    private String nationality;

    @Size(max = 100, message = "Le job ne peut pas dépasser 100 caractères")
    private String job;

    // body infos
    @Min(value = 50, message = "La taille minimale est de 50 cm")
    @Max(value = 300, message = "La taille maximale est de 300 cm")
    private Integer height; // cm

    @Min(value = 20, message = "Le poids minimal est de 20 kg")
    @Max(value = 500, message = "Le poids maximal est de 500 kg")
    private Double weight; // kg

    @Size(min = 2, max = 30, message = "L'emplacement du tatouage doit contenir entre 2 et 30 caractères")
    private String tattoo;

    @Size(min = 3, max = 30, message = "La couleur des yeux doit contenir entre 3 et 30 caractères")
    private String eyeColor;

    @Size(min = 1, message = "Au moins une couleur de cheveux est requise")
    private List< @Pattern( regexp = "^#[0-9A-Fa-f]{6}$", message = "La couleur de cheveux doit être au format hexadécimal (#RRGGBB)")  String >
    hairColors;

    @Size(min = 3, max = 30, message = "Le teint de peau doit contenir entre 3 et 30 caractères")
    private String skinTone;

    // weapons infos

    @Size(max = 100, message = "La description ne peut pas dépasser 100 caractères")
    private String accessories;

    @Size(max = 100, message = "La description ne peut pas dépasser 100 caractères")
    private String weapon1;

    @Size(max = 100, message = "La description ne peut pas dépasser 100 caractères")
    private String weapon2;

}
