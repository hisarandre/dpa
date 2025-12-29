package com.dpa.back.exception;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String message) {
        super(message);
    }
    public static UserNotFoundException byUserName(String username) {
        return new UserNotFoundException("User with username " + username + " not found");
    }

    public static UserNotFoundException byEmail(String email) {
        return new UserNotFoundException("User with email " + email + " not found");
    }

    public static UserNotFoundException byId(Long id) {
        return new UserNotFoundException("User with id " + id + " not found");
    }

    public static UserNotFoundException byField(String field, String value) {
        return new UserNotFoundException("User with " + field + " " + value + " not found");
    }
}