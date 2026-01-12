package com.dpa.back.enums;

public enum UserCategory {
    DEFAULT("Par défaut"),
    MELEE("Armes blanches"),
    FIREARM("Armes à feu"),
    HAND_TO_HAND("Mains nues"),
    EXPLOSIVE("Explosif"),
    HACKER("Hacker");

    private final String displayName;

    UserCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}