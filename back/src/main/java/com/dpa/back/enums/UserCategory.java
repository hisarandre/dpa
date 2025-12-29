package com.dpa.back.enums;

public enum UserCategory {
    DEFAULT("Par défaut"),
    ARMES_BLANCHES("Armes blanches"),
    ARMES_A_FEU("Armes à feu"),
    MAINS_NUES("Mains nues"),
    EXPLOSIF("Explosif"),
    HACKER("Hacker");

    private final String displayName;

    UserCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}