package com.dpa.back.enums;

public enum UserRank {
    MEMBER("Membre"),
    CAPTAIN("Capitaine"),
    BOSS("Boss");

    private final String displayName;

    UserRank(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}