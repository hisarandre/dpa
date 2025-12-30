package com.dpa.back.exception;

import lombok.Getter;

@Getter
public class UserAlreadyExistsException extends RuntimeException {

    private final String field;

    public UserAlreadyExistsException() {
        super("User with email or username already exists");
        this.field = null;
    }

    public UserAlreadyExistsException(String message) {
        super(message);
        this.field = null;
    }

    public UserAlreadyExistsException(String field, String value) {
        super(buildMessage(field, value));
        this.field = field;
    }

    private static String buildMessage(String field, String value) {
        if ("username".equals(field)) {
            return "Le nom d'utilisateur '" + value + "' est déjà utilisé";
        } else if ("email".equals(field)) {
            return "L'email '" + value + "' est déjà utilisé";
        }
        return "User with email or username already exists";
    }

}