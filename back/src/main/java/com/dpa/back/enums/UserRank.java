package com.dpa.back.enums;

public enum UserRank {
    MEMBRE("Membre"),
    SOUS_BOSS("Sous-boss"),
    CAPITAINE("Capitaine"),
    BOSS("Boss");

    private final String displayName;

    UserRank(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}